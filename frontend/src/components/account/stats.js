import React,{useState} from 'react';
import Table from 'react-bootstrap/Table';
import PaginationComp from '../pagination';


function Stats({userTransactions}){
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexofLastTransaction = currentPage * postsPerPage;
    const indexofFirstTransaction = indexofLastTransaction - postsPerPage;
    const currentTransactions = userTransactions.slice(indexofFirstTransaction,indexofLastTransaction);
    const paginate = (number) =>{
        setCurrentPage(number);
    }
    return(
        <div id={'my-account-stats-outer'}>
            <section className={'my-account-stats-transactions-container'}>
                <h2 className={'my-account-stats-section-title'}>Transactions</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr className={'my-account-stats-section-transactions-titles'}>
                            <th>Products</th>
                            <th>Products Price</th>
                            <th>Products Description</th>
                            <th>Total Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map((transaction)=>{
                            return(
                                <tr className={'my-account-stats-section-transactions-body'} key={transaction.title} >
                                    <td ><ul>{transaction.items.map(product=>{
                                        return(<li key={product.title}>{product.title}</li>)
                                    })}</ul>
                                    </td>
                                    <td ><ul>{transaction.items.map(product=>{
                                        return(<li key={product.title}>{product.price} $</li>)
                                    })}</ul>
                                    </td>
                                    <td ><ul>{transaction.items.map(product=>{
                                        return(<li key={product.title}>{product.description}</li>)
                                    })}</ul>
                                    </td>
                                    <td >{transaction.price} $</td>
                                    <td >{transaction.updatedAt.slice(0,10)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    </Table>
                    <div style={{background:'#555555',width:'100%'}}> <PaginationComp postsPerPage = {postsPerPage} totalPosts = {userTransactions.length} paginate={paginate} currentPage={currentPage} className={'pagination'}/></div>
            </section>
        </div>
    )
}
export default Stats;