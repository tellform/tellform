# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

	# Every Vagrant development environment requires a box. You can search for
	# boxes at https://atlas.hashicorp.com/search.
	config.vm.box = "ubuntu/trusty64"
	config.vm.network :forwarded_port, guest: 3000, host: 4567

	config.vm.provision "docker" do |d|
	  d.run "mongo",
	    args: "-p 27017:27017 -d --name some-mongo"
	  d.run "redis",
	    args: "-p 6379:6379 -d --name some-redis"
	  d.run "tellform/development",
	    args: "-p 3000:3000 --link some-redis:redis-db --link some-mongo:db"
	end
end
