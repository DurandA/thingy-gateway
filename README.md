# thingy-gateway

Nordic Thingy:52 Node.js gateway. Please see http://www.nordicsemi.com/thingy for the latest Nordic Thingy:52 news and software releases.

## Installation

### Using VirtualBox (recommended for non-Linux users)
You can download a ready to use VirtualBox VM with the gateway preinstalled on [ILIAS](https://drive.google.com/uc?id=0B9iIfHLFDxf3UThtREIwbUdhWXM&export=download). To use it you must first install the latest version of [VirtualBox platform packages]((https://www.virtualbox.org/wiki/Downloads#VirtualBoxbinaries) and [Oracle VM VirtualBox Extension Pack](https://www.virtualbox.org/wiki/Downloads#VirtualBoxbinaries).

Before starting the machine, you should add a **USB 2.0 (EHCI)** device filter for your Bluetooth device (e.g. *Cambridge Silicon Radio, Ltd CSR8510 A10 [8891]* for to ORICO BTA-403 dongle).
![EHCI filter](http://i63.tinypic.com/64mpfa.png)

Login with thingy:gateway and navigate to thingy-gateway folder using `cd thingy-gateway`.
![gateway VM](http://i68.tinypic.com/25ilu3d.png)

### Native
Before installing *thingy-gateway*, make sure that you have Node.js >= 8. You can check which version of Node.js is installed with `node --version` or `nodejs --version`.

```
git clone https://github.com/DurandA/thingy-gateway
cd thingy-gateway
npm install
```

## Usage
```
/usr/bin/nodejs index.js connect [uuids..]

Options:
  --help        Show help                                              [boolean]
  --api-root    root url of server API        [default: "http://127.0.0.1:8080"]
  --enable-sse  enable server-sent events                       [default: false]
```

Discover Thingy:42 with MAC `C3:46:E4:88:2B:11` and connect to *http://127.0.0.1:8080/api* API with server-sent events:
```
sudo node . connect C3:46:E4:88:2B:11 --api-root http://127.0.0.1:8080/api --enable-sse
```

## Troubleshooting

### The VirtualBox machine doesn't detect my Bluetooth chip/dongle
* Make sure that you installed the [Oracle VM VirtualBox Extension Pack](https://www.virtualbox.org/wiki/Downloads#VirtualBoxbinaries) for USB 2.0 support
* In VM settings, make sure that your Bluetooth device (e.g. *Cambridge Silicon Radio, Ltd CSR8510 A10 [8891]*) is bypassed using a **USB 2.0 (EHCI)** device filter
* Reconnect the Bluetooth dongle while the machine is running

### The gateway cannot connect to the BLE device
* Check that Thingy is detected with BLE scan
```
sudo hcitool lescan
```
* Check that the Bluetooth controller is not blocked
```
sudo hcitool dev
sudo rfkill list all
```
The following output show a blocked controller:
```
0: hci0: Bluetooth
    Soft blocked: yes
    Hard blocked: no
```
You can unblock *hci0* with `sudo rfkill unblock 0`.
* If `noble warning: adapter state unauthorized, please run as root or with sudo` is displayed, prefix the command with `sudo`

## Bluetooth control tool cheatsheet
Use `bluetoothctl` CLI to:
* List available controllers (`list`)
* Controller information (`show [ctrl]`)
* Select default controller (`select <ctrl> `)
* Set controller power (`power <on/off>`)
