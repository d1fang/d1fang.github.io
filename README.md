# Daniel Fang

Personal portfolio at https://d1fang.github.io/, based on Academic Pages.

## Adding content

Add your site content, upload any files (like PDFs, .zip files, etc.) to the `files/` directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.

## Running locally

When you are initially working on your website, it is very useful to be able to preview the changes locally before pushing them to GitHub. To work locally you will need to:

1. Clone this repository and edit `_pages/about.md` for content and `_config.yml` for site settings.

### Linux
1. Make sure you have ruby-dev, bundler, nodejs, and npm installed
    
    On Debian or Ubuntu the command is:
    ```bash
    sudo apt install ruby-dev ruby-bundler nodejs npm build-essential
    ```
    If you see error `Unable to locate package ruby-bundler`, `Unable to locate package nodejs `, run the following:
    ```bash
    sudo apt update
    ```
    then try running `sudo apt install ruby-dev ruby-bundler nodejs npm build-essential` again.

1. Run `bundle install` to install ruby dependencies.

    If you see file permission error like `Fetching bundler-2.6.3.gem ERROR:  While executing gem (Gem::FilePermissionError) You don't have write permissions for the /var/lib/gems/3.2.0 directory.` or `Bundler::PermissionError: There was an error while trying to write to /usr/local/bin.`
    Install Gems Locally (Recommended):
    ```bash
    bundle config set --local path 'vendor/bundle'
    ```
    then try run `bundle install` again. If succeeded, you should see a folder called `vendor` and `.bundle`.

1. Run `npm install` and `npm run build:js` to generate the minimized version of the JavaScript files used by the template. This command will create the file `assets/js/main.min.js`, which is excluded from the repository in favor of building the minimized JavaScript on GitHub as part of the deployment process.

1. Run `jekyll serve -l -H localhost` to generate the HTML and serve it from `localhost:4000` the local server will automatically rebuild and refresh the pages on change to Markdown (*.md) and HTML files, while changes to the core template and configuration (i.e., `_config.yml`) will require stopping and restarting Jekyll.
    You may also try `bundle exec jekyll serve -l -H localhost` to ensure jekyll to use specific dependencies on your own local machine.

If you are running on Linux it may be necessary to install some additional dependencies prior to being able to run locally: `sudo apt install build-essential gcc make`

## Using Docker

Build and run the site with the provided Dockerfile and Docker Compose:

```bash
docker compose up --build
```

Open http://localhost:4000. Changes to Markdown and HTML rebuild automatically; restart after changing `_config.yml`.
