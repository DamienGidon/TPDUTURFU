import { Component, Input } from '@angular/core';
import { Post,Like,Comment } from 'models';
import { PostService, PostSocketService, LoggedUser, MessageParser } from 'services';

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
        let res = this.parser.parse(this.post)
        this.postSocket.onLike(this.OnLike);
        this.post.content = res==null?this.post.content:res;
        this.postSocket.onComment((comment:Comment) => this.onComment(comment))
    }
    DoLike(){
        this.postService.like(this.post);
    }
     OnLike = (like:Like) => {
         if(like.user.id===this.user.id && like.post.id===this.post.id) this.post.liked=true;
    }
    Answer(){
        this.showTextArea= !this.showTextArea;
    }
    callParent(action: string){
        if(action=="close")
            this.showTextArea=false;
     }
    onComment(message: Comment) {
        if(message.post.id===this.post.id) this.post.comments.push(message);
    }
}
