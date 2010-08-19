module Jasmine
  class RunAdapter
    def initialize(config)
      @config = config
      @jasmine_files = [
        "/__JASMINE_ROOT__/lib/jasmine.js",
        "/__JASMINE_ROOT__/lib/jasmine-html.js",
        "/__JASMINE_ROOT__/lib/TrivialReporter.js",
        "/__JASMINE_ROOT__/lib/json2.js",
        "/__JASMINE_ROOT__/lib/consolex.js",
        "/__spec__/jquery/jquery-1.4.2.js",
        "/__spec__/SpecHelper.js"
      ]
      @jasmine_stylesheets = [
        "/__JASMINE_ROOT__/lib/jasmine.css"
        ]
    end
  end
end