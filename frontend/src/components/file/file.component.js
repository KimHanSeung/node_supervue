export default {
  name: 'file',
  components: {},
  props: [],
  //data 에 추가
  data () {
    return {
      boards: {},
    }
  },
  computed: {

  },
  // computed 밑에 추가
  created: function () {
    this.$http.get(`/api/file/list`).then((response) => {
      this.boards = response.data;
    }).catch((err) => {
      alert('error occur in server.');
    });
  },
  mounted () {

  },
  methods: {
    //method에 추가
    streamingVideo(id){
      this.$http.get(`/api/file/streaming/${id}`).then((response) => {
        window.location.href=`http://localhost:8080/api/file/streaming/${id}`
        console.log(response)
      }).catch((err) => {
        alert('error occur in local.');
      });
    }
  }
}
