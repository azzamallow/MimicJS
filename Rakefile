@@current_release = '0.2'
@@version = '0.3'

desc 'Start Jasmine Server'
task :start do
  sh 'cd mimic-spec && rake jasmine'
end

desc 'Run Continous Integration'
task :ci do
  sh 'cd mimic-spec && rake jasmine:ci'
end
task :default => ['ci']

desc 'Build Mimic'
task :dist do
  puts "Building Mimic version #{@@version}"
  
  puts 'Prepare target...'
  `rm target/*.js`
  `cp -R src/scripts/* target`
  
  puts 'Creating minified files...'
  js_src_files = Dir.glob('target/**/*.js')
  js_src_files.each do | js_src_file |
    js_target_file = js_src_file.sub('.js', '-min.js')
    
    puts " #{js_src_file}..."
    `java -jar lib/yuicompressor-2.4.2.jar --nomunge --type js --preserve-semi --line-break 0 --charset ISO-8859-1 #{js_src_file} -o #{js_target_file}`
  end
  
  puts 'Creating new target file...'
  first_set = Dir.glob('target/*-min.js')
  first_set = first_set - ['target/mimic.init-min.js']
  
  ordered_files = first_set + 
                  Dir.glob('target/overrides/*-min.js') + 
                  Dir.glob('target/default/*-min.js') + 
                  Dir.glob('target/jquery/*-min.js') + 
                  Dir.glob('target/mimic.init-min.js')  
  `cat #{ordered_files.join(' ')} > target/mimic-#{@@version}.js`
  
  puts 'Cleaning up minified files...'
  `rm #{js_src_files.concat(Dir.glob('target/**/*-min.js')).join(' ')}`  
  `rmdir target/default target/jquery target/overrides`
  
  if @@current_release.eql?(@@version)
    puts 'Copying target file to examples directory...'
    `cp target/mimic-#{@@version}.js examples`
  
    puts 'Copying target file to release directory...'
    `cp target/mimic-#{@@version}.js release`
  end
  
  puts ''
  puts 'DONE!'
end