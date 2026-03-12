import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import cartAnimation from '@/assets/Add to Cart Button.lottie';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="w-[120px] h-[120px]">
                <DotLottieReact
                    src={cartAnimation}
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default PageLoader;
