
import RecentSells from './recentSells';
import TopFiveSells from './topFiveSells';
import TopUniqueSells from './topUniqueSells';

function Stats(){
    return(
        <div className={'admin-stats-container'}>
           <TopFiveSells/>
           <TopUniqueSells/>
           <RecentSells/>
        </div>
    )
}
export default Stats;
