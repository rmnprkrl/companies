class MapMarker extends HTMLElement {
	initialAttributes = ['latitude', 'longitude', 'text']
  constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.setInitialAttributes()
  }

  connectedCallback() {}

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
}

customElements.define('map-marker', MapMarker)

export default MapMarker
