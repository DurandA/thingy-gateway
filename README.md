# thingy-gateway

Nordic Thingy:52 Node.js gateway. Please see http://www.nordicsemi.com/thingy for the latest Nordic Thingy:52 news and software releases.

## Installation

Before installing *thingy-gateway*, make sure that you have Node.js >= 8. You can check which version of Node.js is installed with `node --version` or `nodejs --version`.

```
git clone https://github.com/DurandA/thingy-gateway
cd thingy-gateway
npm install
```

## Usage

```
Commands:
  connect [uuids..]  connect to device(s) with specified [uuids..] (= MACs) and
                     connect to <api-root>
  discover           discover all devices and connect to <api-root>

Options:
  --help  Show help                                                    [boolean]
```

### Connect

```
/usr/bin/nodejs index.js connect [uuids..]

Options:
  --help        Show help                                              [boolean]
  --api-root    root url of server API        [default: "http://127.0.0.1:8080"]
  --enable-sse  enable server-sent events                       [default: false]
```

Connect to Thingy:42 with MAC `C3:46:E4:88:2B:11` and connect to *http://127.0.0.1:8080/api* API with server-sent events:
`sudo node . connect C3:46:E4:88:2B:11 --api-root http://127.0.0.1:8080/api --enable-sse`

### Discover

```
/usr/bin/nodejs index.js discover

Options:
  --help        Show help                                              [boolean]
  --api-root    root url of server API        [default: "http://127.0.0.1:8080"]
  --enable-sse  enable server-sent events                       [default: false]
```

## Troubleshooting

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

## Bluetooth control tool cheatsheet
Use `bluetoothctl` CLI to:
* List available controllers (`list`)
* Controller information (`show [ctrl]`)
* Select default controller (`select <ctrl> `)
* Set controller power (`power <on/off>`)
