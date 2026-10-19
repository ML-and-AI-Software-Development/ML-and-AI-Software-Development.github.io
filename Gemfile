source "https://rubygems.org"

# Jekyll
gem "jekyll", "~> 4.4"

# Default theme
gem "just-the-docs", "~> 0.12"

# Jekyll plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# GitHub-flavored Markdown
gem "kramdown-parser-gfm"

# Windows and JRuby do not include zoneinfo files
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for watching directories on Windows
gem "wdm", "~> 0.2.0", platforms: [:mingw, :x64_mingw, :mswin]

# JRuby compatibility
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
