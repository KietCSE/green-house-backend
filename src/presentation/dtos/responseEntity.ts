export default class ResponseEnity {
    private constructor(private statusCode?: boolean, private data?: any, private message?: string) { }

    static Builder = class Builder {
        private status?: boolean
        private data?: any
        private message?: string

        setStatus(status: boolean) {
            this.status = status
            return this
        }

        setMessage(message: string) {
            this.message = message
            return this
        }

        setData(data: any) {
            this.data = data
            return this
        }

        build() {
            return new ResponseEnity(this.status, this.data, this.message)
        }
    }
}