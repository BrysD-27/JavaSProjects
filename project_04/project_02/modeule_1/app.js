function setActive(sectionNumber) {
    $('.left-nav, .content').removeClass('active');
    const dataSectionSelector = "[data-section=" + sectionNumber + "]";
    const dataLinkToSelector = "[data-link-to=" + sectionNumber + "]";

    $(dataSectionSelector)
}