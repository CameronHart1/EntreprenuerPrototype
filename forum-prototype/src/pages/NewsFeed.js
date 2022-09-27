import "../CSS/p_newsfeed.css"

export const NewsFeed = () => {
  // HTML here
  return (
    // needs to be in a div
    <div>
      {/* HeadLine */}
      <div>
        <HeadLine />
        <div>

        </div>
      </div>
    </div>
  );
};

const HeadLine = (props) => {
  return (
    <div>
      <div className="headline">
        <img src={`${process.env.PUBLIC_URL}\\images\\NewsFeedHeadLine.png`} alt="Head Line" />
        <div id='text'>
          <h1>Renegades vs Chiefs - ESL Pro <br/>League Season 16 - Playoffs</h1>
          <p>League of Legends®</p>
          <button>Watch</button>
        </div>
      </div>
    </div>

  )
}

const RecVid = (props) => {
  return (
    <div>

    </div>
  )
}