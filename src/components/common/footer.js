import React from 'react';
const Footer = () => {
    function footerDown() {
        let headerHeight =  document.getElementsByTagName("header")[0].offsetHeight;
        let footerHeight =  document.getElementsByClassName("footer")[0].offsetHeight;
        let window =  document.documentElement.clientHeight;
        let h = window - (headerHeight + footerHeight);
        document.getElementsByClassName("mainContent")[0].style.minHeight = h + 'px';
    }
    window.onload = () => footerDown()
    return (
        <div className="footer text-center">
            <p> 2017 &copy; Developed by acm1899</p>
        </div>
    )
}
export default Footer;
