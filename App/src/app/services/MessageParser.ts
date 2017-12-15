import {
    Post,
    PostContent,
    YoutubePostContent,
    PicturePostContent,
    VideoPostContent
}
    from '../models';



const youtube = "https://youtu.be/";

/**
 * Parse post content
 */
export class MessageParser {

    parse(post: Post): PostContent<any> {
        const pictureRegex = /http[s]?:\/\/.+\.(jpeg|png|jpg|gif)/gmi;
        const pictureMatche = pictureRegex.exec(post.message);

        if (pictureMatche) {
            console.log(post.message);
            return new PicturePostContent(pictureMatche[0]);
            // return new PicturePostContent(post.message);
            // return picture content
        }

        const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
        const videoMatch = youtubeRegex.exec(post.message);
        if (videoMatch) {
            let video_id = videoMatch[0].split('v=')[1];
            console.log(video_id);            
            return new YoutubePostContent(video_id);
        }


        const videoRegex = / /gmi; // TODO
        // return VideoContent if match


        return null;
    }
}
