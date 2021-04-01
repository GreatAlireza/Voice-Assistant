import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards'; 
import useStyles from './styles.js';



//my newsapi.org API key: 312800ce07b1435dba88d194ea557102
const alanKey = 'c8fb6fbd5464157973623c8c05f76ee22e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () =>{
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1); //index of article that currently be reading
    const classes = useStyles();

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles, number})=>{
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);   
                    setActiveArticle(-1);
                } else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle)=> prevActiveArticle+1); 
                } else if (command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy:true}) : number;
                    const article = articles[parsedNumber-1];
                    if(parsedNumber>20){
                        alanBtn().playText('Please try that again.')
                    } else if(article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                }
            }
        })
    },[])

    return(
        <div>
            <div className={classes.logoContainer}>
                <img src="https://minerescue.org/wp-content/uploads/2020/03/Marketplace-Lending-News.jpg" className={classes.alanLogo} alt="Alan Logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}


export default App;