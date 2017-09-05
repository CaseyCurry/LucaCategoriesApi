job "luca-services-categories-api" {
	datacenters = ["devlab"]
	type = "service"
  constraint {
    attribute = "${driver.rkt}"
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
				image = "luca.com/categories-api:latest"
        insecure-options = ["image" ]
				port_map {
					app = "http"
				}
			}
			service {
        name = ${JOB}
				port = "http"
				check {
					name = "healthy"
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
					port "http" {}
				}
			}
		}
	}
}
