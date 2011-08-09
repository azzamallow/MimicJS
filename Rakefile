@@current_release = '0.4'
@@version = '0.4'

desc 'Start Jasmine Server'
task :start do
  sh 'cd mimic-spec && rake jasmine'
end

desc 'Run Continous Integration'
task :ci do
  sh 'cd mimic-spec && rake jasmine:ci'
end
task :default => ['ci']

desc 'Build Mimic Ajax'
task :dist_ajax do
  puts "Building Mimic Ajax version #{@@version}"
  
  print 'Prepare target...'
  `mkdir target`
  `rm target/*.js`
  `cp -R src/scripts/mimic.js src/scripts/mimic.language.js src/scripts/ajax/* src/scripts/overrides/* target`
  puts 'done!'
  
  print 'Creating minified files...'
  js_src_files = Dir.glob('target/**/*.js')
  js_src_files.each do | js_src_file |
    js_target_file = js_src_file.sub('.js', '-min.js')
    
    print '.'
    `java -jar lib/yuicompressor-2.4.2.jar --nomunge --type js --preserve-semi --line-break 0 --charset ISO-8859-1 #{js_src_file} -o #{js_target_file}`
  end
  puts 'done!'
  
  print 'Creating new target file...'
  ordered_files = Dir.glob('target/*-min.js')
  `cat #{ordered_files.join(' ')} > target/mimic-ajax-#{@@version}.js`
  puts 'done!'
  
  print 'Cleaning up minified files...'
  `rm #{js_src_files.concat(Dir.glob('target/**/*-min.js')).join(' ')}`
  puts 'done!'
  
  if @@current_release.eql?(@@version)
    print 'Copying target file to examples directory...'
    `cp target/mimic-ajax-#{@@version}.js examples`
    puts 'done!'
  
    print 'Copying target file to release directory...'
    `cp target/mimic-ajax-#{@@version}.js release`
    puts 'done!'
  end
end

desc 'Build Mimic'
task :dist do
  puts "Building Mimic version #{@@version}"
  
  puts 'Prepare target...'
  `mkdir target`
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
  first_set = first_set - ['target/mimic.init-min.js', 'target/mimic-min.js']
  
  ordered_files = Dir.glob('target/mimic-min.js') + 
                  Dir.glob('target/ajax/*-min.js') +
                  first_set +  
                  Dir.glob('target/dom/*-min.js') + 
                  Dir.glob('target/overrides/*-min.js') + 
                  Dir.glob('target/default/*-min.js') + 
                  Dir.glob('target/mimic.init-min.js')
  `cat #{ordered_files.join(' ')} > target/mimic-#{@@version}.js`
  
  puts 'Cleaning up minified files...'
  `rm #{js_src_files.concat(Dir.glob('target/**/*-min.js')).join(' ')}`  
  `rmdir target/default target/dom target/ajax target/overrides`
  
  if @@current_release.eql?(@@version)
    puts 'Copying target file to examples directory...'
    `cp target/mimic-#{@@version}.js examples`
  
    puts 'Copying target file to release directory...'
    `cp target/mimic-#{@@version}.js release`
  end
  
  puts ''
  puts 'DONE!'
end