import sys
import libvirt

conn = libvirt.open('qemu:///system')
name=sys.argv[1]
if conn == None:
    print('Failed to open connection')
    exit(1)

dom = conn.lookupByName(name)
dom.destroy()
