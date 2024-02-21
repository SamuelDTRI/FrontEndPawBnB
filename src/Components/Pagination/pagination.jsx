import { ContainerPagination } from "./pagination.styled";

const Pagination = ({ pages, prevHandler, nextHandler, currentPage }) => {

    return (
        <ContainerPagination>
            {pages >=1 &&
                <div className="pagination-btn">
                    <button className={currentPage>=1? "btn-nav" : "btn-none"} onClick={()=>prevHandler()}>&lt; Anterior</button>
                    <div className="pagination-pag">
                        <span className="pag">{currentPage+1}</span><span>de {pages+1}</span>
                    </div>
                    <button className={currentPage<pages? "btn-nav" : "btn-none"} onClick={()=>nextHandler()}>Siguiente &gt;</button>
                </div>
            }
        </ContainerPagination>
    )
}

export default Pagination;