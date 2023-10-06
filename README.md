The *Whats New?* project is a wiki for short, visually engaging summaries of academic publications within the fields of applied math and computer science.

You can visit our website at [whatsnew.wiki](whatsnew.wiki).

## Getting Started

Clone and cd into the repository on your local machine.

Run the development server: `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing webpages by modifying `page.tsx` files within `app/` directory. The page auto-updates as you edit the file.

## Sketch Contributions

Sketches are written in [GitHub Flavored Markdown](https://github.github.com/gfm/) (GFM) and rendered using the `react-markdown` node package.

Steps for publishing a new sketch to the website catalogue:

0. Pull latest from `main` production branch

1. Checkout a new branch `git checkout <branch-name>` for each sketch submission

2. Write your sketch as a markdown `.md` file and save with the rest of the sketch catalogue inside the `posts/` directory

3. Git `add`, `commit` and `push` your markdown sketch file to your new branch `<branch-name>`

4. Create a pull request to merge `<branch-name>` into `main` and select a reviewer from the list of collaborators

5. After review, make any needed updates and merge into `main` - you're done!
   
## Web Deployment

The app is statically deployed on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) with GitHub integration. 

Every push to `main` automatically triggers a new build and re-deployment routine.

Check out [Next.js deployment documentation](https://nextjs.org/docs/deployment) for Vercel documentation.

## Backlog

- [high] Create and test markdown sketch template (Leqi & Quinn)
  
- [high] Add math and code styling to `react-markdown` translation layer  
  
- [med] Limited "featured" section to 4-8 most recent sketches, regardless of number of catalogue entries
   
- [low] Migrate to flutter framework and add mobile app version
