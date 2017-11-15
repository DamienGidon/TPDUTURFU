import { Component, Input } from '@angular/core';
import { Comment, Post } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

/**
 * Display a user post with comments and like 
 */
@Component({
  selector: 'post',
  templateUrl: 'post.html'
})
export class PostComponent { 
    @Input() post: Post;
    showTextArea: boolean = false;
    
    constructor(
        private postSocket: PostSocketService, 
        private user: LoggedUser,
        private postService: PostService,
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.post.content = this.parser.parse(this.post);
        this.postSocket.onComment((comment:Comment) => this.onComment(comment))
    }

    /**
     * Send the new post message to the server
     * @param message message to send
     */
    onComment(message: Comment) {
        if(message.post.id===this.post.id) this.post.comments.push(message);
    }

    Answer(){
        this.showTextArea= !this.showTextArea;
    }
    callParent(action: string){
        if(action=="close")
            this.showTextArea=false;
     }
}
