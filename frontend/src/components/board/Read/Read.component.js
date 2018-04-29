//export위에 추가 (assets 에 있는 이미지를 모듈로 사용)
import image from './../../../assets/logo.png'

export default {
  name: 'read',
  components: {},
  props: [],
  data () {
    return {
      board : {},
      //data에 변수 추가
      defaultImage : image
    }
  },
  computed: {

  },
  created: function () {
     let no = this.$route.params.no;
     if(no == null || no == ""){
      this.$router.push('/board/list');
      return;
     }

     this.$http.defaults.headers.common['X-Access-Token'] = this.$session.get('jwt');
     this.$http.get(`/api/board/read/${no}`).then((response) => {

       if(response.data.token == true){
         let date = new Date(response.data.result.registedAt),
           year = date.getFullYear(),
           month = addZero(date.getMonth() + 1),
           day = addZero(date.getDate()),
           hour = addZero(date.getHours()),
           minute = addZero(date.getMinutes()),
           second = addZero(date.getSeconds());

         response.data.result.registedAt = [year, month, day].join("-") + " " + [hour, minute, second].join(":");
         // STEP1 **** START!!!! just image upload without other thing
         response.data.result.imageData = !response.data.result.imageData ? this.defaultImage : response.data.result.imageData;
         // STEP1 **** END!!!! just image upload without other thing
         this.board = response.data.result;
       }

      }).catch((err) => {
       alert('게시글을 가져올 수 없습니다.');
       this.$router.push('/board/list');
     });

    function addZero(value) {
      return value.toString().length < 2 ? '0' + value : value;
    }

   },
  beforeCreate: function () {
    if (!this.$session.exists()) {

      this.$router.push('/');
    }
  },
  mounted () {

  },
  methods: {
    goList(){
      this.$router.push('/board/list');
    },
    boardDelete(){
      let no = this.$route.params.no;
      if(no == null || no == ""){
        return;
       }

        this.$http.defaults.headers.common['X-Access-Token'] = this.$session.get('jwt');
        this.$http.delete(`/api/board/${no}`).then((response) => {

         if(response.data.token == true){
          let result = response.data.result;

          if(result == "success"){
            alert('게시글을 삭제하였습니다.');
            this.$router.push('/board/list');
          }
         }
        }).catch((err) => {
          alert('게시글을 가져올 수 없습니다.');
          this.$router.push('/board/list');
        });
    }
  }
}
