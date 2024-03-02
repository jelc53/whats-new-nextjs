---
sketchTitle: Variational Inference
sketchAuthor: "Julian Cooper, 30th Oct. 2023"
sketchPublishDate: "2023-09-15"
articleTitle: Automatic Differentiation Variational Inference
articleAuthor: Alp Kucukelbir
articlePublishDate: "2017-01-01"
category: Statistics
bannerImage: /imgs/neuromancer_headset.png
description: "Variational Inference is used to approximate joint posterior distributions. This sketch summarizes the method, its pros and cons, and existing   implementations."
---

|     |     |
| --- | --- |  
| **Title** | **Automatic Differentiation Variational Inference** |  
| Author(s) | Alp Kucukelbir, Dustin Tran, Rajesh Ranganath, Andrew Gelman and David Blei |  
| Date published | January, 2017 |  
|     |     |   


### motivation

Markov Chain Monte Carlo (MCMC) sampling techniques - such as Metropolis-Hastings, Gibbs Sampling, and Hamiltonian Monte Carlo - represent the most common approach for approximating a posterior distribution that is analytically intractable. These techniques guarantee convergence to the true posterior given sufficient data. Variational Inference (VI), by contrast, is an alternative technique that almost certainly will *not* converge to the true posterior. So why then do we care about VI?

The answer is simple: *speed to convergence*. With the exception of Gibbs Sampling (requires us to find conditional distributions for each parameter, often intractable), the VI algorithm is much faster than MCMC sampling techniques.

Moreover, if we start with a good proposal distribution (more on this later), then we are likely to converge to a posterior "close to the true posterior. Unfortunately, it is difficult to know how close. While some accuracy bounds have been explored by Yao et al [[3]](#reference-documentation), in practice we normally also implement MCMC sampling to check the accuracy of our VI method. If our result is "close enough" for a given model formulation, we will then disregard the MCMC sampler in favour of the faster VI implementation and make the assumption that VI will continue to perform well on variations of our model with new data.   


### a brief history

Variational Inference, Laplace Approximation and Integrated Nested Laplace Approximation all belong to a family of techniques developed in the 1990s that seek to approximate an intractable bayesian posterior distribution with a simpler, tractable distribution. 

Ihe first significant publication on VI applied to statistical inference was written in 1999 by Michael I. Jordan, Zoubin Ghahramani, Tommi S. Jaakkola and Lawrence K. Saul [[1]](#reference-documentation). Jordan et al introduced the idea that if one could find a well-chosen family of distributions, then inference could be reframed as an optimization problem where we search for the parameters (i.e. a specific member of this family) that minimize the Kullback-Leibler (KL) divergence between the true posterior and the proposed approximate distribution. 

Kucukelbir et al brought the theory of VI into practice by implementing a version in code that leveraged Stan's Auto-Differentiation software library [[2]](#reference-documentation). 


### math intuition

Bayesian inference requires us to find a way to solve for $p(\theta|X)$, the posterior distribution of the parameters $\theta$ given the observed data $X$. In practice, there are two ways to approach this problem: (i) simulation (MCMC techniques) or (ii) optimization (VI, INLA, etc.).

The idea behind VI is to look for a distribution $q(\theta)$ that can be a surrogate (tractable approximation) for our true posterior $p(\theta|X)$. We do this by first proposing a family of distributions $\mathcal{Q}$ and then iteratively searching for the optimal set of parameters $\phi$ (i.e. a specific member of the family) such that $q(\theta ; \phi) \in \mathcal{Q}$ best approximates $p(\theta|X)$. Inference now amounts to solving the following optimization problem:

$$ 
q^*(\theta) = \mathop{\arg \min}\limits_{q(\theta) \in \mathcal{Q}} KL(q(\theta)||p(\theta|X)) 
$$

However, this objective function as-is would require us to directly compute the Kullback-Leibler (KL) Divergence which is often intractable. In particular, the evidence term $\log p(X)$ in the KL equation below is the reason we sought out numerical methods like MCMC or VI in the first place.

$$ 
KL(q(\theta)||p(\theta|X)) = \mathbb{E}_q[\log q(\theta)] - \mathbb{E}_q[\log p(\theta, X)] + \log p(X) 
$$

Instead, we want to re-formulate the objective function to something equivalent that we know how to compute: the evidence lower bound, or ELBO. 

$$ 
ELBO(q) = \mathbb{E}_q[\log p(X|\theta)] - KL(q(\theta)||p(\theta))
$$

The ELBO is the negative KL Divergence between the variational distribution and true posterior $KL(q(\theta)||p(\theta))$ plus the expected log likelihood of the data $\mathbb{E}_q[\log p(X)]$. Maximizing this quantity is equivalent to minimizing the KL Divergence from our original optimization objective function, but now with some basic logarithm arithmetic [[6]](#reference-documentation) we can formulate without the $\log p(X)$ term.
 
$$ 
ELBO(q) = \mathbb{E}_q[\log p(\theta, X)] - \mathbb{E}_q[\log q(\theta)] 
$$

> **Note**: Maximizing the ELBO represents choosing parameters $\phi(X)$ for $q$ that optimally trade-off between fitting surrogate model to observed data (accuracy) and encouraging the model to not diverge too far from our prior distribution (regularization). 

Another property of the ELBO is that it lower-bounds the log evidence $\log p(X) \ge ELBO(q)$ for any $q(\theta)$. This explains the name. To see this, notice that $ \log p(X) = KL(q(\theta)||p(\theta|X)) + ELBO(q)$ and recall that $KL(.) \ge 0$. 
$$ 
ELBO(q) \ge \log \frac{\mathbb{E}_q[p(\theta, X)]}{\mathbb{E}_q[q(\theta)]} 
$$

![Sketch of optimization solved by Variational Inference algorithm](/imgs/variational-inference-optimization.png)


### stan advi algorithm

Kucukelbir et al introduced the first end-to-end automated algorithm for Variational Inference in 2016 [[2]](#reference-documentation), implemented in the open-source probabilistic programming language Stan. The scientist need only provide a probabilistic model and a dataset, nothing else.

The following outlines the Automatic Differentiation Variational Inference (ADVI) procedure:

1. Pick a proposal distribution $q(\theta ; \phi)$ from our chosen family of distributions $\mathcal{Q}$.

2. Re-write ELBO expectation as a numerical approximation by sampling from our joint posterior and taking the average (LLN).

3. For each optimization step ($\phi_l$):

      - Sample N times from current proposal distribution $q(\theta ; \phi_l)$

      - Use samples to compute approximate ELBO (our loss) and store computational graph

      - Estimate gradient of negative ELBO with backpropagation (stan's autograd library)

      - Increment gradient-based optimizer (adam) to find updated set of distribution parameters $\phi_{l+1}$

      - Stop algorithm when converged to distribution $q^* = q(\theta ; \phi^*)$ within family $Q$ that maximizes the ELBO

The result is a proposal distribution $q \in \mathcal{Q}$ that minimizes the KL divergence with the true posterior.

*Stochastic ADVI*: While vanilla ADVI is already lightening fast compared with MCMC sampling methods, we can further speed-up the algorithm by estimating the gradient of the negative ELBO with only a subset of the observed data $X_i$. As with many stochastic algorithms, this approach reduces time-per-iteration at the cost of some error in the gradient direction at each step. On average convergence with Stochastic ADVI is faster and we are still guaranteed to find the optimal distribution $q^* \in \mathcal{Q}$.


### worked example

In this section we tackle a simple example (where we know the analytical solution) and implement the solution in code with TensorFlow. 

**Problem statement**: Want to find the posterior of a normal distribution with unknown mean $p(\mu \mid X=D)$.

![Directed graphical model for our worked example](/imgs/vi-worked-example.png)

Note, here $\mu$ is our unknown parameter which we referred to generically as $\theta$ in previous sections.

**Math formulation**: Propose a parameter surrogate distribution $q(\mu)=N\left(\mu ; \mu_{s}, \sigma_{s}\right)$, where $\mu_{s}$ and $\sigma_{s}$ are learnable parameters we optimise.

Want to find parameters of surrogate $q(\mu)$ that minimizes our "loss" $\mathcal{L}\left(\mu_{s}, \delta_{s}\right)$ which we define to be the negative ELBO.

$$
\begin{aligned}
q(\mu)^{\text{*}}= & \operatorname{argmin}-E L B O \\
& q(\mu) \in Q \\
\mu_{s}^{\*}, \sigma_{s}^{\*}= & \underset{\mu_{s}, \sigma_{s}>0}{\operatorname{argmin}-\mathbb{E}}\left[\log \frac{p(\mu, X=D)}{q(\mu)}\right]
\end{aligned}
$$

While typically not possible to evaluate this expectation (ELBO) directly, we can approximate by sampling (eg. $L=10,000$ ) from our surrogate $q(\mu)$.

$$
-\mathcal{L}\left(\mu_{s}, \sigma_{s}\right) \underset{\text{LLN}}{\approx}-\frac{1}{L} \sum_{l=0}^{L-1} q\left(\mu=\mu^{[l]}\right) \cdot \log \frac{P\left(\mu=\mu^{[l]}, X=D\right)}{q\left(\mu=\mu^{[l]}\right)}
$$

Having picked a surrogate $q(\mu)$ and gernerated our samples, we can now evaluate every part of this ELBO approximation ! As we do this, we want to build store each step to create a computational graph that we can use to derive loss gradients (backprop).

$$
\frac{\partial-\mathcal{L}\left(\mu_{s}, \sigma_{s}\right)}{\partial \mu_{s}}=\ldots \quad \quad \frac{\partial-\mathcal{L}\left(\mu_{s}, \sigma_{s}\right)}{\partial \sigma_{s}}=\ldots
$$

Finally, once we have gradients we can use a gradient-based optimizer (eg. Adam) to find our optimal parameters $\mu_{s}^{[j]}, \sigma_{s}^{[j]} \underset{j \rightarrow \infty}{\longrightarrow} \mu_{s}^{\*}, \sigma_{s}^{\*}$.


**Code implementation**: TensorFlow autodiff and distribution libraries used to reproduce math formulation.

- import libraries, generate dataset from true model

    ```python
    import silence_tensorflow.auto
    import tensorflow_probability as tfp
    import tensorflow as tf

    # true solution
    mu_true = 4.0
    sigma_true = 2.0

    # generate data from true model
    N = 100  # number of samples
    X = tfp.distributions.Normal(loc=mu_true, scale=sigma_true)
    dataset = X.sample(N)
    ```
    
- set priors and evaluate analytical solution

    ```python
    # priors
    mu_0 = 4.2
    sigma_0 = 0.3  # medium confidence

    # analytical solution
    sigma_fix = sigma_true
    mu_N = (sigma_fix **2 + mu_0 + sigma_0**2 * tf.reduce_sum(dataset)) / (sigma_fix**2 + N * sigma_0**2)
    sigma_N = (sigma_0 * sigma_fix) / tf.sqrt(sigma_fix**2 + N * sigma_0**2)
    # check mu_N and sigma_N closely approximate our true solution!
    ```

- define joint log probability and surrogate models needed to evaluate elbo

    ```python
    # define generator needed to define joint probability
    def generative_model(mu_0, sigma_0, sigma_fix, n_samples):
        mu = yield tfp.distributions.JointDistributionCoroutine.Root(
            tfp.distributions.Normal(loc=mu_0, scale=sigma_0, name="mu")
        )
        X = yield tfp.distributions.Normal(loc=mu * tf.ones(n_samples), scale=sigma_fix, name="X")

    # define joint probability model
    model_joint = tfp.distributions.JointDistributionCoroutineAutoBatched(lambda : generative_model(mu_0, sigma_0, sigma_fix, N))
    # can call model_joint.sample() to generate samples from joint posterior

    # define joint log probability function for given mu [log p(mu, X=D)]
    model_joint_log_prob_fixed_data = lambda mu: model_joint.log_prob(mu, datatset)
    # can call model_joint_log_prob_fixed_data(3.0) to evaluate joint log prob of some mu given our dataset

    # define surrogate model [q(mu)]
    mu_S = tf.Variable(mu_0, name="mu surrogate")
    sigma_S = tfp.util.TransformedVariable(sigma_0, bijector=tfp.bijectors.Softplus(), name="sigma surrogate")
    surrogate_posterior = tfp.distributions.Normal(loc=mu_S, scale=sigma_S, name="surrogate posterior")
    ```

- run optimization to find variational inference numerical solution

    ```python
    # evaluate negative elbo and compute computational graph 
    with tf.GradientTape() as g:
        samples = surrogate_posterior.sample(3)
        neg_elbo = - tf.reduce_mean(model_joint_log_prob_fixed_data(samples) - surrogate_posterior.log_prob(samples))

    # derive gradient from neg_elbo computational graph (autodiff)
    # this is the direction we need to move our mu_S and sigma_S to find the minimum negative elbo
    g.gradient(neg_elbo, surrogate_posterior.trainable_variables)

    # execute optimization to find (u_S*, sigma_S*)
    tfp.vi.fit_surrogate_posterior(
        target_log_prob_fn = model_joint_log_prob_fixed_data,
        surrogate_posterior = surrogate_posterior,
        optimizer = tf.optimizers.Adam(0.1),  # learning rate = 0.1
        num_steps = 1000, 
        sample_size = 100,  # num samples we use to approx elbo
    )

    # sense check that our variational inference numerical solution mu_S, sigma_S 
    # approximately equals the analytical solution mu_N, sigma_N 
    ```


### probabilistic programming languages
Here we consider only the Probabilistic Programming Languages (PPLs) that offer 
Variational Inference implementations as well as a python development interface, 
including Stan, PyMC, Pyro, Edward2 and NumPyro.

While most of these languages offer the full range of MCMC sampling and model 
evaluation methods for bayesian inference, they differ substantially in their 
choice of backend (= host language they are compiled to). This produces 
differences in stability and speed of auto-differentiation, vectorization 
and hardware acceleration (multiple cpu or gpu cores).


|                        | Stan                                    | PyMC                                         | Pyro                                    | Edward2                                        | NumPyro                                          |
|-------------------     |--------------------                     |----------------------                        |----------------------                   | ----------------------                         |----------------------------                      |
| backend libraries      | Home-built, compiled in C++             | Theano/Aesara with JAX integration           | Facebook's PyTorch framework (2016)     | Google's TensorFlow framework (2015)           | Google's JAX framework (2018)                    |
| ease of use            | Beautiful declarative language          | Great support community, very pythonic       | Need familiarity with PyTorch           | Requires familiarity with TensorFlow           | Pyro interface but with access to JAX libraries  |
| hardware acceleration  | C++ multi-thread & MPI support          | JAX vectorization & CPU/GPU parallel support | CPU/GPU parallel support                | CPU/GPU parallel support                       | JAX vectorization & CPU/GPU parallel support     |
| other comments         | Best documentation, good for small data | Since 4.0 upgrade, best MCMC option          | Best for SVI and BNNets, large datasets | Some integration for JAX, not well adopted yet | Leightweight and fastest HMC-NUTS implementation |



### reference documentation

*An Introduction to Variational Methods for Graphical Models (Michael Jordan, Zoubin Ghahramani, Tommi S. Jaakkola and Lawrence K. Saul, 1999)*
*[[1]](https://www.researchgate.net/publication/226435002_An_Introduction_to_Variational_Methods_for_Graphical_Models)*

*Automatic Differentiation Variational Inference (Alp Kucukelbir, Rjesh Ranganath, Andrew Gelman and David Blei, 2016)*
*[[2]](https://arxiv.org/abs/1506.03431)*

*Yes, but Did It Work?: Evaluating Variational Inference (Yuling Yao, Aki Vehtari, Daniel Sompson and Andrew Gelman, 2018)*
*[[3]](https://arxiv.org/pdf/1802.02538.pdf)*

*Stochastic Variational Inference (Matt Hoffman, David M. Blei, Chong Wang and John Paisley, 2012)*
*[[4]](https://arxiv.org/abs/1206.7051)*

*Variational Inference: A Review for Statisticians (David M. Blei, Alp Kucukelbir, Job D. McAuliffe, 2028)*
*[[5]](https://arxiv.org/pdf/1601.00670.pdf)*

*A Practical Tutorial on Variational Bayes (Minh-Ngoc Tran, 2021)*
*[[6]](https://arxiv.org/pdf/2103.01327.pdf)*

