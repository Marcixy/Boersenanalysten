// own component imports
import Bloglistitem from '../../widgets/outputs/bloglistitem/Bloglistitem';

import './Blog.css';

function Blog() {
    return (
        <div className="blog-page">
            <h2>Blog</h2>
            <Bloglistitem 
                blogarticlelink="/blogarticle210928"
                blogtitle="Vermögensaufbau und Marathon - Gemeinsamkeiten und Unterschiede"
                creationDate="28. September 2021"
                estimatedReadTime="5 Min" /> 
        </div>
    )
}

export default Blog;