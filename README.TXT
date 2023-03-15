Rest API installation:

	1. Copy gaia_api-0.1-cp991255033.i386.rpm to your machine.
	2. cd to the file dir.
	3. Run 'rpm -Uhv --force gaia_api-0.1-cp991255029.i386.rpm'
	4. Run 'rest_api_stop'
	5. Run 'rest_api_start'



For Ansible(instruction taken from https://github.com/CheckPoint-APIs-Team/cpAnsible)

1. Install Ansible.
2. Install a Python interpreter with version >= 2.7.9, but not Python 3 or above.
3. In your /etc/ansible/ansible.cfg file, there is a library line, uncomment it and set it to be whatever you want, this will be your library folder for modules.
4. Unrar ansible_files.rar
5. Move the check_point_mgmt folder to your library folder.
6. Move the cp_mgmt_api_python_sdk directory from the check_point_mgmt directory, into /usr/lib/python2.7/site-packages

host, ansible.cfg and playbooks are attached for your usage  


Postman - running the example Rest API commands:

	1. Import the file 'rest api commands.postman_collection.json' as collection to postman.
	2. Create environment variable called 'ip' with the machine ip.
	3. Click on each command and send the request.

In addition, to see more commands you can look at the /rest_api/xml/rest_api.xml file on the machine after the installation.
Example for command in the xml file:

        <command url="/set-interface">

          <must-args>

            <one-of>

              <args>

                <arg key="interface" type="interface"/>

                <arg key="ipv4-address" type="IPv4"/>
                <arg key="mask-length" type="int(0,32)"/>

              </args>

              <args>

                <arg key="name" type="interface"/>

                <arg key="ipv6-address" type="IPv6"/>

                <arg key="mask-length" type="int(0,32)"/>

              </args>

            </one-of>

          </must-args>

          <clish output="ignore">set interface {interface} ipv4-address {?ipv4-address:{ipv4-address}?} {?ipv6-address:{ipv6-address}?} mask-length {mask-length}</clish>

        </command>


As you can see, there are optional arguments and required arguments for each command and each argument as a type (on the cammand above there is only <must-args>).

Additionally, for the command above:
	
	1. The url is 'https://ip-address-of-your-machine/set-interface.
	2. The session id must be sent on the header ad 'sid'.
	3. The arguments are sent by json, for example, for the command above:

		{

			"interface": "eth1",

			"ipv4-address":"1.2.3.4",

			"mask-length":24
		
}
	4. Don't forget to set the headers:
		 - 'Content-Type' to be 'application/json'.
		 - 'X-chkp-sid' to be {{sid}}.
	   on all the commands except login command.

########################################################################

To unsubscribe from the API_TECH list, click the following link:
http://michael.checkpoint.com/cgi-bin/wa?SUBED1=API_TECH&A=1
