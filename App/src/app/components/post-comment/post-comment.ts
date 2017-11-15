import { Component, Input,ViewChild, EventEmitter, Output } from '@angular/core';
import { Comment } from 'models';
import { PostService } from '../../services/index';
import { NgForm } from '@angular/forms';

/**
 * Display a post comment
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;
    message:string;
    @ViewChild(NgForm)
    ngForm: NgForm;
    @Output() callParent = new EventEmitter<string>();

    constructor( private postervice: PostService) {}

    send() 
    {
        if (this.ngForm.form.invalid) {
            return;
        }
        else{
            this.postervice.comment(this.comment,this.message).then( () =>{
                this.ngForm.reset();
                this.callParent.emit("close");
            });
        }
    }
    
}