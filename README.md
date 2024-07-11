# zach.fetters.me

Personal website - Made using Jekyll + Decap CMS

![Netlify Status](https://api.netlify.com/api/v1/badges/f8f7ecc0-901b-4f3d-aab5-5941678c0efe/deploy-status)

## Requirements

- Ruby v3.6.0 or greater
- Ruby Bundler (if not pre-installed with your Ruby installation)

## Local Setup

1. Clone repo locally
2. Navigate to the repo in your terminal and run `bundle install`
3. To view local changes live, run `bundle exec jekyll serve --watch` and go to the provided URL in your browser (typically http://127.0.0.1:4000) 

As you make changes to the site, refresh the page in your browser and your changes will appear live. If you're finding that changes aren't appearing initially, find the `_site` folder at the root of the project and delete it. This will force Jekyll to rebuild the site.

## Netlify

To publish this site with all features on Netlify, please ensure you've setup the following:

### Build settings

- **Runtime**: Leave blank  
- **Base directory**: `/`  
- **Package directory**: Leave blank  
- **Build command**: `npm run build`  
- **Publish directory**: `_site`  
- **Functions directory**: Leave default  

### Decap CMS

_(Note: the Decap CMS integration is completely optional, but highly recommended for first-time users. If you don't want to use it, delete the `admin` folder at the root of the project.)_

To use the Decap CMS to allow for easy site management, please ensure that Netlify Identity is enabled and configured. In the Identity integration settings, use the following settings:

- Set registration to "invite only"
- Enable Git Gateway

Once configured, make sure to add yourself to the Identity users by inviting yourself via email. Refer to the [Decap CMS](https://decapcms.org/docs/access-your-content/) and [Netlify Identity documentation](https://docs.netlify.com/security/secure-access-to-sites/identity/) for more information.

To access the CMS admin page, navigate to the `/admin/` page of your site e.g. `yoursite.com/admin/`. Make sure to visit the Decap CMS documentation to see how to test your CMS configuration locally.

## Configuration

Some basic site-wide configurations are available in the `_config.yml` file at the root of the project:

- `title`: The name of the website. This will appear in the header as well as the browser tab.
- `author`:
  - `name`: The name of the site's author.
  - `email`: The email of the site's author.
- `timezone`: The site's timezone. Will affect all dates/times on the site.

There are other settings to configure, however this is only recommended for advanced users and should otherwise be left untouched.

## License

The source code for this website is licensed under the MIT license. The full terms of the license can be read in the `LICENSE` file at the root of the project.
