<script>
 
  export default {
    props: {
      google: {
        type: Object,
        required: true
      },
      map: {
        type: Object,
        required: true
      },
      marker: {
        type: Object,
        required: true
      }
    },
 
    mounted() {
      const { Marker } = this.google.maps;
      const { Circle } = this.google.maps;
 
      new Marker({
        position: this.marker.position,
        marker: this.marker,
        map: this.map,
        title: this.marker.title,
 
      });
      new Circle({
       
        map: this.map,
          strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: this.map,
            center: this.marker.position,
            radius: 10000
      })
 
    },
 
    render() {}
  };
 
</script>