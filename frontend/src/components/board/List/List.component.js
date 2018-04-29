//export위에 추가 (assets 에 있는 이미지를 모듈로 사용)
import image from './../../../assets/logo.png'

export default {
  name: 'list',
  components: {},
  props: [],
  data () {
    return {
      boards : {},
      //data에 변수 추가
      defaultImage : image
    }
  },
  computed: {

  },
    created: function () {
    this.$http.defaults.headers.common['X-Access-Token'] = this.$session.get('jwt');
    this.$http.get(`/api/board/list`).then((response) => {

      if(response.data.token == true){
        const resDataLength = response.data.result.length;
        for (let i = 0; i < resDataLength; i++) {
          let date = new Date(response.data.result[i].registedAt),
            year = date.getFullYear(),
            month = addZero(date.getMonth() + 1),
            day = addZero(date.getDate()),
            hour = addZero(date.getHours()),
            minute = addZero(date.getMinutes()),
            second = addZero(date.getSeconds());

          response.data.result[i].registedAt = [year, month, day].join("-") + " " + [hour, minute, second].join(":");
          // STEP1 **** START!!!! just image upload without other thing
          response.data.result[i].imagePreview = !response.data.result[i].imageData ? this.defaultImage : response.data.result[i].imageData;
          // STEP1 **** END!!!! just image upload without other thing
        }
        this.boards = response.data.result;
      }

    }).catch((err) => {
      alert('게시글을 가져올 수 없습니다.');
      this.$router.push('/board/list')
    });

    function addZero(value) {
      return value.toString().length < 2 ? '0' + value : value;
    }

  },
 beforeCreate: function () {
   if (!this.$session.exists()) {
     this.$router.push('/member/login');
   }
 },
  mounted () {

  },
  methods: {
    boardList(){
      this.$http.get('/board/list')
        .then((response) => {
          this.board = response.data;
        })

    },
    writeBoard(){
      this.$router.push('/board/write')
    }
  }
}
