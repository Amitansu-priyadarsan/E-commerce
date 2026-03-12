import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="w-120 h-120">
                <DotLottieReact
                    src="/src/assets/Add to Cart Button.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default PageLoader;
