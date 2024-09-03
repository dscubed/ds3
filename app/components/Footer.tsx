import Link from 'next/link'
import * as Icon from 'react-bootstrap-icons'

export default function Footer () {
  return (
    <footer className="relative z-20 px-5 py-8 bg-background-secondary">
      <div className="flex flex-col gap-10 max-w-screen-xl mx-auto">
        <div className="flex md:flex-col gap-4 md:gap-5 justify-between text-text-secondary">
          <p className="md:text-center">© {(new Date).getFullYear()} DSCubed · Data Science Student Society</p>
          <div className="flex gap-8 md:mx-auto flex-wrap justify-center gap-y-6">
            <Link href="mailto:hello@dscubed.org.au" target="_blank">
              <Icon.EnvelopeFill className="w-5 h-5"/>
            </Link>
            <Link href="https://instagram.com/dscubed.unimelb" target="_blank">
              <Icon.Instagram className="w-5 h-5"/>
            </Link>
            <Link href="https://www.facebook.com/dscubed.unimelb/" target="_blank">
              <Icon.Facebook className="w-5 h-5"/>
            </Link>
            <Link href="https://discord.gg/hFX4PJZ5MQ" target="_blank">
              <Icon.Discord className="w-5 h-5"/>
            </Link>
            <Link href="https://medium.com/dscubed-unimelb" target="_blank">
              <Icon.Medium className="w-5 h-5"/>
            </Link>
            <Link href="https://www.linkedin.com/company/dscubed/" target="_blank">
              <Icon.Linkedin className="w-5 h-5"/>
            </Link>
            <Link href="https://www.xiaohongshu.com/user/profile/6543cfc7000000000301f7d9?xhsshare=CopyLink&appuid=5c3186f0000000000603e555&apptime=1725321208&share_id=cece5619af7d46079489e7d4263ac3d9" target="_blank">
              <svg className="w-5 h-5 text-muted-foreground" width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_117_408)"><path d="M29 0.333301C13.9599 3.46665 1.53567 15.2045 -7.80821e-06 31C-1.58611 47.3142 -7.80821e-06 64.5976 -7.80821e-06 81V183C-7.80821e-06 201.76 -4.73698 227.199 7.33333 243C20.3721 260.069 44.1567 256 63 256H174H209C214.783 256 221.332 256.847 227 255.667C242.04 252.533 254.464 240.795 256 225C257.586 208.686 256 191.402 256 175V73C256 54.2397 260.737 28.8011 248.667 13C235.628 -4.069 211.843 -2.75373e-05 193 -2.75373e-05H82H47C41.2172 -2.75373e-05 34.6676 -0.84744 29 0.333301ZM120 91L113 110H125L115 134L124 135C123.012 137.682 121.683 142.733 119.667 144.833C118.189 146.372 115.927 146 114 146C109.641 146 100.832 147.805 98.5 143C97.4303 140.796 98.9655 138.015 99.8333 136C101.647 131.788 104.056 127.484 105 123C102.825 123 100.075 123.43 98 122.667C90.2215 119.807 98.874 107.302 100.667 103C101.925 99.979 103.423 93.4152 106.167 91.5C110.019 88.8108 115.883 90.675 120 91ZM41 154C43.7507 154 47.8374 154.817 49.5 152C51.269 149.002 50 142.41 50 139V106C50 102.907 48.4382 93.4645 51.1667 91.5C53.4107 89.8843 62.8329 90.2261 63.8333 93C65.4706 97.5398 64 105.162 64 110V142C64 147.484 64.9491 153.864 62.6667 159C60.4895 163.899 50.3632 168.272 45.3333 164.5C43.1201 162.84 41.5453 156.59 41 154ZM193 91V96C196.729 96 201.411 95.2366 205 96.3333C216.976 99.9927 216 111.756 216 122C217.997 122 220.044 121.844 222 122.333C233.493 125.207 232 136.697 232 146C232 150.956 232.931 156.822 229.667 161C226.071 165.602 220.185 165 215 165C213.388 165 210.737 165.51 209.333 164.5C206.71 162.611 205.552 156.995 205 154C208.287 154 214.218 155.125 216.833 152.667C219.916 149.769 218.654 138.435 215 136.5C213.063 135.475 210.113 136 208 136H193V165H179V136H165V122H179V110H170V96H179V91H193ZM161 96V110H153V152H166V165H120L125.333 152.5L138 152V110H130V96H161ZM218 110C218 107.158 217.484 103.741 218.333 101C221.678 90.2068 237.949 98.906 229.833 107.833C228.911 108.848 227.289 109.344 226 109.667C223.439 110.307 220.62 110 218 110ZM41 110L36.8333 147L30 159L24 143L27 110H41ZM87 110L90 143L84 158H82C76.6331 149.502 75.9467 140.737 75 131C74.3278 124.086 73 116.96 73 110H87ZM193 110V122H202V110H193ZM118 152L113 165H91L96.3333 151.5L104 151.667L118 152Z" fill="rgb(var(--text-secondary))"/></g><defs><clipPath id="clip0_117_408"><rect width="256" height="256" fill="rgb(var(--text-secondary))"/></clipPath></defs></svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
