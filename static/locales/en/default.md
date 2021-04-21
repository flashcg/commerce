---
name: Cloner Alliance
lang: en
handleSetting:
  - handleName: DVD-Cloner
    path: dvd-cloner
  - handleName: DVD-Cloner Gold
    path: dvd-cloner-gold
  # - handleName: DVD-Cloner Platinum
  #   path: dvd-cloner-platinum
  # - handleName: DVD-Cloner for Mac
  #   path: dvd-copy-for-mac  
  # - handleName: OpenCloner UltraBox
  #   path: openCloner-ultrabox
  - handleName: Blue-Cloner
    path: blue-cloner
  - handleName: Stream-Cloner Lite
    path: stream-cloner-lite 
  - handleName: Open DVD Ripper Lite
    path: open-dvd-ripper-lite    
  # - handleName: Blue-Cloner Diamond
  #   path: blue-cloner-diamond
  - handleName: OpenCloner Ripper
    path: open-cloner-ripper     
globalName:
  ok: OK
  submit: Submit
  confirm: Confirm
  cancel: Cancel
  search: Search
  pageNotFound: Page not found
  backHome: Back to home
  backToHelp: Return to help page
  play: Play
  replay: Replay
  requested: Required
  productDetail: Product Detail
  comparsion: What's different?
  coupon: Coupon
  more: More Info
  buy: Buy Now
  download: Download
  downloadGoogle: Download from Google Play
  upgrade: Upgrade Now
  get50off: Get Time-Limited 50% Off
  yes: 'Yes'
  no: 'No'
  clickHere: click here
  warning: Warning
  firmwareDownload: Click here to download firmware
  productModel: Product Model
  size: Size
  videoGuide: Video Guide
  clickToSee: Click to see more
  buildVersion: Build Version
  howToUpgrade: how To Upgrade
  release: Release
  releaseDate: Release Date
  standard: Standard
  lifetime: Lifetime
  license: License
  searchPlaceholder: Enter your keywords
menuTop: 
  - name: Blu-ray and DVD Copy
    template: product
    promotion:
      imageUrl: pr/ca2020nov/nav_poptup_bar.gif
      path: store
      hash: Promo Area
    items:
      - groupButtons: # hash(页面锚点) variant（按钮样式）属性可用
          - text: More DVD Copy
            path: unsupported-content
            variant: #primary
        children: #handleName
          - DVD-Cloner
          - DVD-Cloner Gold
          - DVD-Cloner
          - DVD-Cloner
        additionClass: bg-red
      - groupButtons: # hash(页面锚点) variant（按钮样式）属性可用
          - text: More Blu-ray Copy
            path: unsupported-content
            variant: #primary
        children: #handleName
          - Blue-Cloner
          - DVD-Cloner
        additionClass:   
  - name: Video Ripper and Converter
    template: product
    items:
      - groupButtons: # hash(页面锚点) variant（按钮样式）属性可用
          - text: More DVD Copy
            path: unsupported-content
            variant: #primary
        children: #handleName
          - DVD-Cloner
          - DVD-Cloner Gold
          - DVD-Cloner
          - DVD-Cloner
        additionClass: 
      - groupButtons: # hash(页面锚点) variant（按钮样式）属性可用
          - text: More Blu-ray Copy
            path: unsupported-content
            variant: #primary
        children: #handleName
          - Blue-Cloner
          - DVD-Cloner
        additionClass: 
  - name: UHD Solutions
    items:
      - children: #handleName
          - DVD-Cloner
        text: Remove HDCP Protection from 4K/UHD Video Capature Devices
      - children: 
          - name: UHD Friendly Drives and Softwware Copying
            iconUrl: uhd-friendly-drives-and-softwware-copying.png
            path: uhd-video-copy-recording         
  - name: Download
    additionClass: ml-xl-4
    template: normal
    path: download
  - name: Order
    template: normal
    path: order                 
  - name: Support
    template: normal
    promotion:
      imageUrl: pr/ca2020nov/nav_poptup_bar.gif
      path: store
      hash: Promo Area
    items:
      - children: 
          - name: Knowledge Base
            iconUrl: knowledge-base.png
            href: https://www.dvd-cloner.com/knowledge/
          - name: Video Guide
            iconUrl: video-guide.png
            path: video-guide
          - name: Upgrade Center
            iconUrl: upgrade-center.png
            path: upgrade-center
          - name: Contact Us
            iconUrl: contact-us.png
            path: contact   
menuFooter: 
  - name: Company
    children: 
    - name: About
      path: aboutus
    - name: Affiliate
      path: affiliate
    - name: Blog
      path: blog
    - name: Contact Us
      path: contact
  - name: Products
    path: products
    children: 
    - name: Order
      path: order
    - name: Download
      path: download          
    - name: Release
      path: release
  - name: Featured
    children:
    - name: DVD Copy
      path: dvd-copy
    - name: Blu-ray Copy
      path: blu-ray-copy
    - name: 4K UHD Copy
      path: uhd-video-copy-recording
    - name: DVD Ripper
      path: dvd-ripper
    - name: Blu-ray Ripper
      path: blu-ray-ripper
    - name: Video Converter
      path: video-converter
    - name: Video Capture Recording
      path: video-capture-recording      
  - name: Support
    children: 
    - name: Knowledge Base
      href: https://www.dvd-cloner.com/knowledge/
    - name: Upgrade Center
      path: upgrade
    - name: Video Guide
      path: video-guide       
social:
  - name: facebook
    url: https://www.facebook.com/ClonerAlliance
  - name: twitter
    url: https://twitter.com/ClonerAlliance
bottomItems:
  - name: Home
    path: index
  - name: Blu-ray Copy
    path: blu-ray-copy
  - name: 4K UHD Copy
    path: uhd-video-copy-recording
  - name: DVD Ripper
    path: dvd-ripper
  - name: Blu-ray Ripper
    path: blu-ray-ripper  
copyright: 
  textA: Copyright &copy; 
  textB: OpenCloner&#8482; Inc. All rights Reserved



#网站通用变量区
imagesPath: https://s1.occld.com/image/dc_com_web/
KB_basePath: https://www.dvd-cloner.com/knowledge/
download_basePath: https://s1.occld.com/release/
manual_basePath: https://s1.occld.com/manual/
video_basePath: https://s1.occld.com/video/dc_com_web
videoProduct_basePath: https://s1.occld.com/video/products/


newverValidDay: 3

#页面通用组件定义区
jumbotronPromotion:
  - template: overlay
    active: false # 控制是否显示
    overlayBody: # template 样式为 overlay 时有效 , 设置内容区样式
      template: promotion
      active: true  
      path: store
      hash: Promo Area
      imageUrl: pr/ca2020nov/web_sec_covid19_sale.jpg
    additionClass: text-center
    bgStyle:
      color: white
      opacity: false
newsletter:
  name: Newsletter
  container: container
  title: ClonerAlliance Newsletters
  textTop: 
  buttonText: Subscribe
  textBottom: Subscribe to receive the latest ClonerAlliance information via email. You can receive news about our latest releases or promotion, or be advised when updates are available for the hardware you are interested in.
productDesTable:
  name: Name
  data: Data       
cookieNotice:
  text: |
    We use cookies to enhance site navigation, analyze site usage, and assist us to improve your website experience.
  button: Allow
productRecommend:
  name: Recommend
  container: container
  additionClass: position-relative bg-gray-light
  items:
    - title: Recommend
      cols: 
        - imageUrl: recommend-dg-2021_banner.jpg
          path: /dvd-cloner-gold/
          additionClass: mb-2
        - imageUrl: bundle-2021.jpg
          path: /order/#bundles        
    - title: Tips
      cols:
        - additionClass:
          text: '<p><a class="btn rounded-0 btn-outline-dark" href="/dvd-cloner/faqs-dvd-cloner/">FAQs of DVD-Cloner earlier version.</a></p>
          <p><a href="/dvd-copy-for-mac/">DVD copy for Mac</a>, <a href="/dvd-cloner/">DVD-Cloner</a>, <a href="/dvd-cloner/dvd-cloner-5/">DVD-Cloner 5</a>, <a href="/dvd-cloner/dvd-cloner-4/">DVD-Cloner 4</a>, <a href="/dvd-cloner/dvd-cloner-3/">DVD-Cloner 3</a>, <a href="/dvd-cloner/dvd-cloner-2/">DVD-Cloner 2</a>, <a href="/blu-ray-to-dvd/index/">Blu-ray copy Tools</a>, <a href="/knowledge/">DVD-Cloner Knowledge Base</a>, <a href="/dvd-cloner/bonus/">Bonus</a>, <a href="/dvd-cloner/vista/">Windows 10 test</a>, <a href="/antivirus_report/">Antivirus Report</a>, <a href="/dvd-cloner/upgrade/">Upgrade</a>, <a href="/dvd-cloner/resource/">Resource</a>, <a href="http://www.stream-cloner.com/">download online movies</a>, <a href="/dvd-cloner/dvd-cloner-screenshot-express/">Express Screenshot</a>, <a href="/dvd-cloner/dvd-cloner-screenshot-expert/">Expert Screenshot</a>, <a href="/dvd-cloner/dvd-to-avi/">DVD to AVI</a>, <a href="/dvd-cloner/dvd-to-mpeg/">DVD to MPEG</a>, <a href="/dvd-cloner/dvd-to-svcd/">DVD to SVCD</a>, <a href="/dvd-cloner/articles/digital-rights-management/">Digital rights Management</a>, <a href="/dvd-cloner/articles/how-will-the-film-or-video-into-a-dvd-format/">How to burn video files into the DVD format</a>, <a href="/dvd-cloner/articles/what-benefits-does-blu-ray-offer-compared-to-hd-dvd/">What benefits does Blu-ray offer compared to HD-DVD?</a>, <a href="/dvd-cloner/articles/what-is-blu-ray-disc/">What is Blu-ray Disc?</a></p>' 
    - title: Related Sites
      cols:
        - text: '     
      <p><a href="/dvd-to-ipod-converter/"><strong>iPod-Cloner</strong></a> - Easily converts all  kinds of DVD to iPod compatible formats</p>
      <p><a href="/blu-ray-to-dvd/"><strong>Blu-ray to DVD II Pro</strong></a></p>
      <ul>
        <li>Copy a Blu-ray movie to DVD(s) </li>
        <li>Copy a Blu-ray movie to AVCHD DVD(s)</li>
        <li>Totally the same picture quality to the original</li>
      </ul>'
---