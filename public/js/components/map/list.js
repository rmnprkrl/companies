const template = document.createElement('template')

template.innerHTML = `
	<link
			 rel="stylesheet"
			 href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
			 integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
			 crossorigin=""/>
	<style>
		:host([hidden]) { display: none }
		:host {
			display: block;
			width: 100%;
		}
		.Component {
			height: 100%;
			min-height: 17rem;
		}
		.leaflet-marker-icon {
			/* background-color: red; */
		}

		.leaflet-popup-content  {
			margin: 0.3rem;
		}
		.leaflet-popup-content a {
			display: block;
			padding: 0.8rem;
		}
	</style>
	<div class="Component"></div>
`

class MapList extends HTMLElement {
	initialAttributes = ['latitude', 'longitude']

  constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.setInitialAttributes()
		this.shadowRoot.appendChild(template.content.cloneNode(true))
  }


  connectedCallback() {
		const $component = this.shadowRoot.querySelector('.Component')
		const markerData = Object.keys(this.children).map(index => {
			const $item = this.children[index]
			let item = {}
			$item.getAttributeNames().forEach(attr => {
				item[attr] = $item.getAttribute(attr)
			})
			return item
		})

		if (true || this.checkDependencies()) {
			this.renderLeaflet($component, markerData)
		}
  }

	setInitialAttributes = () => {
		const values = this.initialAttributes.map(attr => this.getAttribute(attr))
		const allAttrSet = values.filter(Boolean).length === this.initialAttributes.length

		if (allAttrSet) {
			this.initialAttributes.forEach(attr => {
				this[attr] = this.getAttribute(attr)
			})
		} else {
			console.log('Missing required attributes', this.initialAttributes)
		}
	}

	checkDependencies = () => {
		typeof L === 'undefined' ? false : true
	}

	renderLeaflet = ($el, markerData) => {
		var map = L.map($el).setView([this.latitude, this.longitude], 13)
		map.zoomControl.setPosition('topright');

		const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
		const mapAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		L.tileLayer(tileUrl, {
			attribution: mapAttribution,
			position:'bottomleft'
		}).addTo(map)

		const iconUrl = 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
		markerData.forEach(data => {
			var icon = L.icon({
				iconUrl,
				iconSize: [20, 20],
				popupAnchor: [0, -15]
			})
			L.marker([data.latitude, data.longitude], {icon})
									.addTo(map)
									.bindPopup(data.text)
		})
	}
}

customElements.define('map-list', MapList)

export default MapList
