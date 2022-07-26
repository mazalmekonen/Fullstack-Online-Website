import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination'
const PaginationComp = ({postsPerPage,totalPosts,paginate,currentPage}) =>{
    const pageNumbers = [];
    const [maximumPages] = useState(5);
    const [currentMinusPage,setCurrentMinusPage] = useState(1);
    
    for(let i  = 1; i <= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }
    useEffect(()=>{
        switch(currentPage){
            case 1:
                setCurrentMinusPage(1);
                break;
            case 2:
                setCurrentMinusPage(2);
                break;
            case 3:
                setCurrentMinusPage(3);
                break;
            default:
                break;
        }
    })
    const indexOfLastPage =  currentPage + maximumPages - currentMinusPage;
    const indexOfFirstPage = indexOfLastPage - maximumPages ;
    const currentPages = pageNumbers.slice(indexOfFirstPage,indexOfLastPage);
return(
    <Pagination>
          <Pagination.First className={'pagination-page'} onClick={()=>{paginate(1)}}/>
          <Pagination.Prev className={'pagination-page'} onClick={()=>{if(currentPage-1>0)paginate(currentPage-1)}}/>
          {currentPage>3?<Pagination.Ellipsis className={'pagination-page'} onClick={()=>{if(currentPage-3>0)paginate(currentPage-3);}}/>:''}
            {currentPages.map((number)=>{
            return(
                    <Pagination.Item className={'pagination-page'} key={number} onClick={()=>{paginate(number)}} active={number===currentPage}>{number} </Pagination.Item>
                )
            })}
            {currentPage<pageNumbers[pageNumbers.length-1] -3?<Pagination.Ellipsis className={'pagination-page'} onClick={()=>{if(currentPage+3<=pageNumbers[pageNumbers.length-1])paginate(currentPage+3);}}/>:''}
          <Pagination.Next className={'pagination-page'} onClick={()=>{if(currentPage+1<=pageNumbers[pageNumbers.length-1])paginate(currentPage+1);}}/>
          <Pagination.Last className={'pagination-page'} onClick={()=>{paginate(pageNumbers[pageNumbers.length-1])}}/>
    </Pagination>
)}
export default PaginationComp;