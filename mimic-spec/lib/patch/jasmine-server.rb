module Jasmine
  class RunAdapter
    def initialize(config)
      @config = config
      @jasmine_files = [
        "/__JASMINE_ROOT__/lib/" + File.basename(Dir.glob("#{Jasmine.root}/lib/jasmine*.js").first),
        "/__JASMINE_ROOT__/lib/TrivialReporter.js",
        "/__JASMINE_ROOT__/lib/json2.js",
        "/__JASMINE_ROOT__/lib/consolex.js",
        "/__spec__/jquery/jquery-1.2.6.js",
        "/__spec__/jquery/jquery.fn.js",
        "/__spec__/jquery/jquery.print.js",
        "/__spec__/jquery/ui.core.js",
        "/__spec__/jquery/ui.tabs.js"
      ]
      @jasmine_stylesheets = ["/__JASMINE_ROOT__/lib/jasmine.css"]
    end
  end
end