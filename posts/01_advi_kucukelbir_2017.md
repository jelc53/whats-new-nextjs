---
sketchTitle: Variational Inference
sketchAuthor: "Julian Cooper, 30th Oct. 2023"
sketchPublishDate: "2023-09-15"
articleTitle: Automatic Differentiation Variational Inference
articleAuthor: Alp Kucukelbir
articlePublishDate: "2017-01-01"
category: Statistics
bannerImage: /imgs/neuromancer_headset.png
description: "Variational Inference is used to approximate joint posterior distributions. This sketch summarizes the method, its pros and cons, and existing implementations."
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

Moreover, if we start with a good proposal distribution (more on this later), then we are likely to converge to a posterior close" to the true posterior. Unfortunately, it is difficult to know how close. While some accuracy bounds have been explored by Yao et al [[3]](#useful-references), in practice we normally also implement MCMC sampling to check the accuracy of our VI method. If our result is "close enough" for a given model formulation, we will then disregard the MCMC sampler in favour of the faster VI implementation and make the assumption that VI will continue to perform well on variations of our model with new data.   


### a brief history

Variational Inference, Laplace Approximation and Integrated Nested Laplace Approximation all belong to a family of techniques developed in the 1990s that seek to approximate an intractable bayesian posterior distribution with a simpler, tractable distribution. 

Ihe first significant publication on VI applied to statistical inference was written in 1999 by Michael I. Jordan, Zoubin Ghahramani, Tommi S. Jaakkola and Lawrence K. Saul [[1]](#useful-references). Jordan et al introduced the idea that if one could find a well-chosen family of distributions, then inference could be reframed as an optimization problem where we search for the parameters (i.e. a specific member of this family) that minimize the Kullback-Leibler (KL) divergence between the true posterior and the proposed approximate distribution. 

Kucukelbir et al brought the theory of VI into practice by implementing a version in code that leveraged Stan's Auto-Differentiation software library [[2]](#useful-references). 


### math intuition

Bayesian inference requires us to find a way to solve for $p(\theta|X)$, the posterior distribution of the parameters $\theta$ given the training set $X$. In practice, there are two ways to apporach this problem: (i) simulation (MCMC techniques) or (ii) optimization (VI, INLA, etc.).

The idea behind VI is to look for a distribution $q(\theta)$ that can be a surrogate (tractable approximation) for our true posterior $p(\theta|X)$. We then try to make $q[\theta|\phi(X)]$ look as simialr as possible to $p(\theta|X)$ by changing the values of $\phi$. 

This is done by maximizing the Evidence Lower Bound (ELBO). The ELBO is Jensen's inequality applied to the log probability of observations. This produces a useful lower bound on the log-likelihood of some observed data. By choosing a good approximation $q$ of our posterior, we are maximizing the ELBO!
$$ \log p(x) \ge \mathbb{E}_q[l] \approx \mathbb{E}_q[\log p(x, Z)] - \mathbb{E}_q[\log q(Z)] $$

KL divergence is equal to the negative ELBO plus the log marginal probability of our data $X$. Minimizing 
KL divergence is equivalent to maximizing the ELBO since the log marginal probability ($\log p(x)$) does not depend on $q$.

$$ \text{KL}(q(z)|| p(z|x)) = -(\mathbb{E}_q[\log p(x, Z)] - \mathbb{E}_q[\log q(Z)] )+ \log p(x) $$

![Sketch of optimization solved by Variational Inference algorithm](/imgs/variational-inference-optimization.png)


Toy example problem ...

Possible approches to solve for posterior ...

Why ELBO is a natural lower bound ...

Put it together ...

**Variational Inference** (VI) was developed in mid 2010s and can be viewed as an 
extension of the Expectation-Maximisation (EM) algorithm. Unlike the previous 
algorithms, VI is not a Monte Carlo sampling method. The main idea is to iteratively
maximize the likelihood of a proposal distribution $Q$ such that it converges 
to the true posterior (i.e. minimizes KL divergence). We do this by choosing 
parameters for $Q$ that maximize ELBO which is a tractable lower bound on the likelihood of 
our observed data and is a function of $q$. We can then sample directly from our 
distribution $Q$ to approximate the posterior.

For many applications, variational inference produces comparable results to Gibbs Sampling at similarly 
lightening fast speeds, but do not need to derive the conditional distributions 
to sample from. Assuming we pick a simple proposal distribution $Q$, the update 
equations for VI should be straight forward. 

Evidence Lower Bound (ELBO): Jensen's inequality applied to the log probability 
of the observations. This produces a useful lower-bound on the log-likelihood of some 
observed data. By choosing a good approximation $q$ of our posterior, we are 
maximizing the ELBO ($\mathbb{E}_q[l]$). 



### stan algorithm

First end-to-end algo that automated VI. 
Particularly autograd and proposal dist!

- Pick a proposal distribution

- Rewrite ELBO expectation as an approx. by sampling and taking the average (LLN)

- For each optimization step (theta_l):

  - Sample L times from current proposal distribution (with theta_l)

  - Use samples to compute approx. ELBO (our loss) and store computational graph

  - Estimate gradient of negative ELBO with backprop / autograd

  - Increment gradient-based optimizer (adam) to find updated dist. params (theta_l + 1)

  - Stop when converged to dist. params that minimize negative ELBO


Result is optimal params for proposal distribution that minimizes KL divergence with posterior

Fast alternate version: xx


### code implementations

Short example ... tensorflow

```python
import numpy as np

def main():
    # print statement to console
    print("Our code looks great!")

if __name__ == "__main__":
    main()
```

Table or just description of the different implementations ...
Stan, PyMC, Pyro, NumPyro, Edward2


### useful references

An Introduction to Variational Methods for Graphical Models (Michael Jordan, Zoubin Ghahramani, Tommi S. Jaakkola and Lawrence K. Saul, 1999) 
[[1]](https://www.researchgate.net/publication/226435002_An_Introduction_to_Variational_Methods_for_Graphical_Models)

Automatic Variation Inference in Stan (Alp Kucukelbir, Rjesh Ranganath, Andrew Gelman and David Blei, 2017)
[[2]](https://arxiv.org/abs/1506.03431)

Yes, but Did It Work?: Evaluating Variational Inference (Yuling Yao, Aki Vehtari, Daniel Sompson and Andrew Gelman, 2018)
[[3]](https://arxiv.org/pdf/1802.02538.pdf)

Stochastic Variational Inference (Matt Hoffman, David M. Blei, Chong Wang and John Paisley, 2012)
[[4]](https://arxiv.org/abs/1206.7051)

Variational Inference Practical Walkthrough (Minh-Ngoc Tran, 2021)
[[5]](https://arxiv.org/pdf/2103.01327.pdf)

