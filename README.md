PyCon India 2014 Website
===

How to contribute
---

 - Install [Jekyll](http://jekyllrb.com/docs/installation/)
 - fork this repo and clone the forked repo
 - run this command -

        $ jekyll serve -w

 - follow the instruction on console
 - make changes (Don't touch the `_site` directory)
 - add, commit, push and send pull request


How to write blog posts
---

 - After forking and setting the site up locally, run this command  -

        $ rake post title="My Legendary blog post"

 - On console it'll say that it has created a file inside `_posts` directory
 - Open the same file, write your blog post
 - Make sure you're running `jekyll serve -w` and watching for the changes and testing it on your browser before pushing
 - add, commit, push and send pull request
