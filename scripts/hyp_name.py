import libvirt
import sys

conn=libvirt.open("qemu:///system")
print (conn.getHostname())
sys.stdout.flush()
