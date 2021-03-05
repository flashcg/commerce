---
name: Cloner Alliance
lang: en
handleSetting:
  - handleName: DVD-Cloner
    path: dvd-cloner
  - handleName: DVD-Cloner Gold
    path: dvd-cloner-gold
  - handleName: DVD-Cloner Platinum
    path: dvd-cloner-platinum
  - handleName: DVD-Cloner for Mac
    path: dvd-copy-for-mac  
  - handleName: OpenCloner UltraBox
    path: openCloner-ultrabox
  - handleName: Blue-Cloner
    path: blue-cloner
  - handleName: Blue-Cloner Diamond
    path: blue-cloner-diamond
globalName:
  ok: OK
  submit: Submit
  confirm: Confirm
  cancel: Cancel
  pageNotFound: Page not found
  backHome: Back to home
  backToHelp: Return to help page
  play: Play
  replay: Replay
  requested: Required
  productDetail: Product Detail
  comparsion: What's different?
  coupon: Coupon
  more: More
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
  releaseDate: Release Date
  standard: Standard
  lifetime: Lifetime
  license: License
menuTop1: 
  - name: Blu-ray and DVD Copy
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
          - DVD-Cloner
          - DVD-Cloner
          - DVD-Cloner
          - DVD-Cloner    
        bgstyle:
      - groupButtons: # hash(页面锚点) variant（按钮样式）属性可用
          - text: More Blu-ray Copy
            path: unsupported-content
            variant: #primary
        children: #handleName
          - Blue-Cloner
          - DVD-Cloner
        bgstyle:           
# menuTop2: 
#   - name: Help
#     active: false
#     children:
#     - name: Help Center
#       path: /help
#     - name: Knowledge Base
#       path: https://www.cloner-alliance.com/help/knowledgebase
#       method: href
#     - name: Download
#       path: /help/download
#     - name: Contact Support
#       path: /help/contact
#     - name: Warranty & RMA
#       path: /help/warranty_rma
#   - name: Store
#     path: /store
#     active: false
#     children:
menuFooter: 
#   - name: Company
#     children: 
#     - name: About Us
#       path: aboutus
#     - name: Affiliate
#       path: affiliate
#     - name: Blog
#       path: https://blog.cloner-alliance.com/
#       method: href
#     - name: Partner
#       path: partner
#   - name: Business Cooperation
#     children: 
#     - name: Products
#       path: products
#     - name: Solutions
#       path: solutions          
#     - name: Success Story
#       path: success_story
#     - name: Get in Touch
#       path: get_in_touch
#     - name: Become a Retailer
#       path: become_retailer
#     - name: Resource 
#       path: resource
#   - name: Help
#     children:
#     - name: Help Center
#       path: help
#     - name: Knowledge Base
#       path: https://www.cloner-alliance.com/help/knowledgebase
#       method: href
#     - name: Download
#       path: help-download
#     - name: Contact Support
#       path: help-contact
#     - name: Warranty & RMA
#       path: help-warranty_rma
#   - name: Legals
#     children: 
#     - name: Terms of Service
#       path: terms
#     - name: Privacy Policy
#       path: privacy_policy
#     - name: Refund Policy
#       path: refund_policy
#     - name: Shipping Policy
#       path: shipping_policy
#     - name: Product usage warning
#       path: unsupported-content            
social:
  - name: facebook
    url: https://www.facebook.com/ClonerAlliance
  - name: twitter
    url: https://twitter.com/ClonerAlliance
  - name: youtube
    url: https://www.youtube.com/c/ClonerAlliance
copyright: 
  textA: Copyright &copy; 
  textB: Cloner Alliance Limited. All rights reserved



#网站通用变量区
imagesPath: http://192.168.31.206:5000/img/
KB_basePath: https://www.cloner-alliance.com/help/knowledgebase/
download_basePath: https://static.cloner-alliance.com/download/
manual_basePath: https://static.cloner-alliance.com/manual/
video_basePath: /static/source/video/
videoProduct_basePath: https://static.cloner-alliance.com/video/products/

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
productLowest:
  name: product recommend
  container: container
  additionClass: position-relative
  items:
    - title: Windows
      cols:
        - additionClass: 
          imageUrl: win10.png
        - additionClass:
          text: '<p>Minimum configuration:</p>
          <ul><li>Intel Core2</li>
            <li>2GB of RAM</li>
            <li>50GB free hard disk space (NTFS partition)</li>
            <li>Windows 7</li>
            <li>A DVD or Blu-ray disc drive</li>
          </ul><p>Recommended configuration:</p>
          <ul><li>Intel i5 or a faster processor</li>
            <li>8GB of RAM</li>
            <li>500GB free hard disk space (NTFS partition)</li>
            <li>A Blu-ray burner</li>
            <li>Windows 10</li>
            <li><a href="/uhd-video-copy-recording/">A UHD friendly drive</a></li></ul>
           <p><img src="{imageUrl}macos.png" style="max-width:80px"><a href="/dvd-copy-for-mac/">Click here to copy DVD on Mac OS</a></p>' 
---