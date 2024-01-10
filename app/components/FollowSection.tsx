import Image from "next/image";
import Link from "next/link";
import * as Icon from 'react-bootstrap-icons';

export default function FollowSection () {
  return (
    <div className="bg-background border border-border mx-2 py-16 my-40 rounded-lg">
      <div className="grid grid-cols-[1fr,auto] gap-4 max-w-screen-lg mx-auto p-4">
        <div className="flex flex-col gap-10 my-auto">
          <div className="flex flex-col gap-8 max-w-xl">
            <h4 className="text-4xl">Follow DS3 On Social</h4>
            <p className="text-xl text-text-secondary leading-relaxed">Interested in what we do? DS3 is the club for data lovers, students passionate about tech, and those who want to learn more about data science. Follow to stay up to date on our latest events.</p>
          </div>
          <div className="grid grid-cols-5 gap-8 w-max">
            <Link href="https://instagram.com/dscubed.unimelb" target="_blank">
              <Icon.Instagram className="w-8 h-8 text-text-secondary"/>
            </Link>
            <Link href="https://www.facebook.com/dscubed.unimelb/" target="_blank">
              <Icon.Facebook className="w-8 h-8 text-text-secondary"/>
            </Link>
            <Link href="https://discord.gg/hFX4PJZ5MQ" target="_blank">
              <Icon.Discord className="w-8 h-8 text-text-secondary"/>
            </Link>
            <Link href="https://medium.com/dscubed-unimelb" target="_blank">
              <Icon.Medium className="w-8 h-8 text-text-secondary"/>
            </Link>
            <Link href="https://www.linkedin.com/company/data-science-student-society/" target="_blank">
              <Icon.Linkedin className="w-8 h-8 text-text-secondary"/>
            </Link>
          </div>
        </div>
        <Image
          className="w-[300px] h-[300px] object-cover rounded-full"
          src="/dalle-monster.webp"
          width={1024}
          height={1024}
          alt=""
        />
      </div>
    </div>
  )
}