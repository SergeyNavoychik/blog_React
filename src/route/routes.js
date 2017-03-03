import React from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import HomePage from '../components/homePage/homePage'
import App from '../components/app'
import BlogPage from '../components/blog/blogPage'
import SingleArticle from '../components/blog/singleArticle'
import PageNotFound from '../components/common/pageNotFound'
import EditArticle from '../components/blog/editArticle'
import Blog from '../components/blog/blog'
export const routes = (
    <div>
        <Route path='/' component={ App }>
            < IndexRoute component={ HomePage }/>
            <Route path={ `/blog` } component={ Blog } >
                <IndexRoute component={ BlogPage } />
                <Route path='/blog/article/:id' component={ SingleArticle }/>
                <Route path='/blog/newArticle' component={ EditArticle }/>
                <Route path='/blog/updateArticle/:id' component={ EditArticle }/>
            </Route>
            <Route path='*' component={ PageNotFound }/>
        </Route>
    </div>
);