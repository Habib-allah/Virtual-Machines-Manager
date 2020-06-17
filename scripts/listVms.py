import sys
import libvirt
conn=libvirt.open("qemu:///system")

domainNames = conn.listDefinedDomains()
for domainName in domainNames:
	print ('{{"name":"{}","state":"{}","maxmem":"{}","nbcpu":"{}"}}'.format(domainName, "-1","NONE","NONE"))

for id in conn.listDomainsID():
	dom = conn.lookupByID(id)
	infos = dom.info()
	print ('{{"name":"{}","state":"{}","maxmem":"{}","nbcpu":"{}"}}'.format(dom.name(), infos[0],infos[1],infos[3]))
sys.stdout.flush()
