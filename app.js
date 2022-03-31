const link = 'http://localhost:5678';

async function updateData() {
    const promise = await axios({
        url: link + '/get',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({ from: '' })
    });
    const data = await promise.data.data;
    return data;
};

const App = {
    data() {
        return {
            placeholderBtnSend: 'Отправить',
            isDisabledBtn: false,
            inputValue: '',
            messages: []
        }
    },
    
    methods: {
        sendMessage() {
            if (this.inputValue) {
                this.isDisabledBtn = !this.isDisabledBtn;
                this.placeholderBtnSend = '<div class="spinner-border" role="status"><span class="sr-only"></span></div>';
                
                axios({
                    url: link + '/create',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({ message: this.inputValue })
                })
                .then(res => {
                    this.isDisabledBtn = !this.isDisabledBtn;
                    this.placeholderBtnSend = 'Отправить';
                    updateData().then(res => this.messages = res);
                })
                .catch(err => console.error(err))
            } 
        },
        inputChangerHandler(e) {
            this.inputValue = e.target.value;
        },
        addNewNote() {
            this.notes.push(this.inputValue)
            this.inputValue = '';
        },
        removeNote(idx) {
            this.notes.splice(idx, 1)
        }
    },
    watch: {
        '$store.state.list': {
          handler() {
            updateData().then(res => this.messages = res);
          },
          immediate: true
        } 
      }
}

Vue.createApp(App).mount('#app');