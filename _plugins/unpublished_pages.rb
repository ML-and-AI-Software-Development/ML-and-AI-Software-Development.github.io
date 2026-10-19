# frozen_string_literal: true

# The GitHub Pages workflow builds with JEKYLL_ENV=production and omits
# unpublished_pages. preview-site.sh builds in development and keeps them.
Jekyll::Hooks.register :site, :after_init do |site|
  next unless Jekyll.env == "production"

  pages = site.config["unpublished_pages"]
  next if pages.nil? || pages.empty?

  site.exclude.concat(pages)
end
