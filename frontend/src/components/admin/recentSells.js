import {Table} from 'react-bootstrap';
import React,{useState, useEffect} from 'react';
import { getRecentSells } from '../../services/mazalStoreApi';
import PaginationComp from '../pagination';


function RecentSells(){

    const [data,setData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    var counter = 1;
    useEffect(()=>{
        getRecentSells(setData);
    },[]);
    const indexOfLastTransaction = currentPage * postsPerPage;
    const indexOfFIrstTransaction = indexOfLastTransaction - postsPerPage;
    const currentTransaction = data.slice(indexOfFIrstTransaction,indexOfLastTransaction);
    const paginate = (number) =>{
        setCurrentPage(number);
    }
    
return(
    <section>
         <div className='stats-title-container'>
                <h1 className='stats-title'>Recent sells in the past 50 days</h1>
            </div>
            <Table variant={"dark"} striped hover id='products-table'>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Buyer</th>
                    <th>Bought at</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {currentTransaction.map(transaction=>{
                        return(
                            <tr key={transaction._id.title}>
                                <td>{counter++}</td>
                                <td>{transaction.buyer?transaction.buyer:'Admin'}</td>
                                <td>{transaction.createdAt.slice(0,10)}</td>
                                <td>{transaction.price} $</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div style={{background:'#555555',width:'100%',borderBottomRightRadius:'50px',borderBottomLeftRadius:'50px'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {data.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
    </section>
)
}
export default RecentSells;