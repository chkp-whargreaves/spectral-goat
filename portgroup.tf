provider "vsphere" {
  user           = "administrator@vsphere.local"
  password       = "Cpwins1!"
  vsphere_server = "10.0.0.9"

  # If you have a self-signed cert
  allow_unverified_ssl = true
}

data "vsphere_datacenter" "dc" {
  name = "Checkpoint"
}

data "vsphere_host" "host" {
  name          = "10.0.0.50"
  datacenter_id = "${data.vsphere_datacenter.datacenter.id}"
}

data "vsphere_datacenter" "datacenter" {
  name = "Checkpoint"
}

data "vsphere_distributed_virtual_switch" "dvs" {
  name          = "DSwitch"
  datacenter_id = "${data.vsphere_datacenter.datacenter.id}"
}

resource "vsphere_distributed_port_group" "pg1000" {
  name                            = "terraform-vlan1000"
  distributed_virtual_switch_uuid = "${data.vsphere_distributed_virtual_switch.dvs.id}"
  vlan_id = 1000
}

resource "vsphere_distributed_port_group" "pg1001" {
  name                            = "terraform-vlan1001"
  distributed_virtual_switch_uuid = "${data.vsphere_distributed_virtual_switch.dvs.id}"
  vlan_id = 1001
}
resource "vsphere_distributed_port_group" "pg1002" {
  name                            = "terraform-vlan1002"
  distributed_virtual_switch_uuid = "${data.vsphere_distributed_virtual_switch.dvs.id}"
  vlan_id = 1002
}
resource "vsphere_distributed_port_group" "pg1003" {
  name                            = "terraform-vlan1003"
  distributed_virtual_switch_uuid = "${data.vsphere_distributed_virtual_switch.dvs.id}"
  vlan_id = 1003
}
