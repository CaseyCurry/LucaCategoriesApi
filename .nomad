job "categories-api" {
	datacenters = ["dev-lab"]
	type = "service"
  constraint {
    attribute = "${meta.rkt}"
    value = "1"
  }
  group "service" {
		restart {
			attempts = 10
			interval = "5m"
			delay = "15s"
			mode = "delay"
		}
		task "api" {
			driver = "rkt"
			config {
				image = "https://raw.githubusercontent.com/caseycurry/LucaOpsEnvironment/master/containers/categories-api.test.aci"
        insecure_options = ["image" ]
				port_map {
					app = "http"
				}
			}
			service {
        name = "categories-api"
				tags = ["luca"]
				port = "app"
				check {
					type = "http"
          path = "/"
					interval = "10s"
					timeout = "2s"
				}
			}
			resources {
				cpu = 125 # 125Mhz
				memory = 64 # 64MB
				network {
					mbits = 10
					port "app" {}
				}
			}
		}
	}
}
