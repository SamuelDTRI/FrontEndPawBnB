import { ContainerSkeletonLanding } from "./skeletonLanding.styled";

const SkeletonLoading = () => {
    return(
        <ContainerSkeletonLanding>
            <div className="cards">
                <div className="card">
                    <div className="card__skeleton card__description"></div>
                    <div className="card__skeleton card__title_ name"></div>
                    <div className="card__skeleton card__title_price"></div>
                    <div className="card__skeleton card__title_city"></div>
                    <div className="card__skeleton card__title_rating"></div>
                    <div className="card__skeleton card__title_btn"></div>
                    <div className="card__skeleton card__title_btn"></div>
                </div>
                <div className="card">
                    <div className="card__skeleton card__description"></div>
                    <div className="card__skeleton card__title_ name"></div>
                    <div className="card__skeleton card__title_price"></div>
                    <div className="card__skeleton card__title_city"></div>
                    <div className="card__skeleton card__title_rating"></div>
                    <div className="card__skeleton card__title_btn"></div>
                    <div className="card__skeleton card__title_btn"></div>
                </div>
                <div className="card">
                    <div className="card__skeleton card__description"></div>
                    <div className="card__skeleton card__title_ name"></div>
                    <div className="card__skeleton card__title_price"></div>
                    <div className="card__skeleton card__title_city"></div>
                    <div className="card__skeleton card__title_rating"></div>
                    <div className="card__skeleton card__title_btn"></div>
                    <div className="card__skeleton card__title_btn"></div>
                </div>
                <div className="card">
                    <div className="card__skeleton card__description"></div>
                    <div className="card__skeleton card__title_ name"></div>
                    <div className="card__skeleton card__title_price"></div>
                    <div className="card__skeleton card__title_city"></div>
                    <div className="card__skeleton card__title_rating"></div>
                    <div className="card__skeleton card__title_btn"></div>
                    <div className="card__skeleton card__title_btn"></div>
                </div>
            </div>
        </ContainerSkeletonLanding>
    )
}

export default SkeletonLoading;