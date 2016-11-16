# wildcard DNS in localhost development
- install [dnsmasq](http://www.thekelleys.org.uk/dnsmasq/doc.html)
```
$ brew install dnsmasq
   ...
$ cp /usr/local/opt/dnsmasq/dnsmasq.conf.example /usr/local/etc/dnsmasq.conf
```
- edit `/usr/local/etc/dnsmasq.conf`
```
address=/dev/127.0.0.1
```
- start **dnsmasq**
```
$ sudo brew services start dnsmasq
```
- any time we change `dnsmasq.conf` we have to re-start **dnsmasq**:
```
$ sudo launchctl stop homebrew.mxcl.dnsmasq
$ sudo launchctl start homebrew.mxcl.dnsmasq
```
- For OS X to _resolve_ requests from `*.dev` to **localhost** we need to add a _resolver_:
```
$ sudo mkdir /etc/resolver
$ sudo touch /etc/resolver/dev
```
- edit `/etc/resolver/dev`
```
nameserver 127.0.0.1
```
- re-start the computer to enable the _resolver_

===
**REFERENCES**

- [Using Dnsmasq for local development on OS X - Passing Curiosity](https://passingcuriosity.com/2013/dnsmasq-dev-osx/)
- [Using Dnsmasq Configure Wildcard DNS Record on Mac | Ri Xu Online](https://xuri.me/2014/12/13/using-dnsmasq-configure-wildcard-dns-record-on-mac.html)
- [unix - In my /etc/hosts/ file on Linux/OSX, how do I do a wildcard subdomain? - Server Fault](http://serverfault.com/questions/118378/in-my-etc-hosts-file-on-linux-osx-how-do-i-do-a-wildcard-subdomain)
- [hostname - Wildcard in /etc/hosts file - Unix & Linux Stack Exchange](http://unix.stackexchange.com/questions/3352/wildcard-in-etc-hosts-file)
- [Mac OS Lion - Wildcard subdomain virtual host - Stack Overflow](http://stackoverflow.com/questions/9562059/mac-os-lion-wildcard-subdomain-virtual-host)
- [How to put wildcard entry into /etc/hosts? - Stack Overflow](http://stackoverflow.com/questions/20446930/how-to-put-wildcard-entry-into-etc-hosts)
