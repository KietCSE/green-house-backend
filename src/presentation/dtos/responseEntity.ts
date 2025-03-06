class ResponseEnity {
    private constructor(private statusCode: Boolean, private data?: any, private message?: string) { }

    static Builder = class {
        private status!: Boolean
        private data?: any
        private message?: string

        setStatus(status: Boolean) {
            this.status = status
        }

        setMessage(message: string) {
            this.message = message
        }

        setData(data: any) {
            this.data = data
        }

        build() {
            return new ResponseEnity(this.status, this.data, this.message)
        }
    }

}