import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedButton } from "@/components/ThemedButton";
import { TermsContext } from "@/hooks/conText/TermsConText";
import { router } from "expo-router";

const TERMS_CONTENT = `
ข้อกำหนดและเงื่อนไขการใช้บริการ & นโยบายความเป็นส่วนตัว

ปรับปรุงล่าสุด: 07/02/68

1. บทนำ
ยินดีต้อนรับสู่ MoneyMind (“แอปพลิเคชัน” หรือ “บริการ”) เราให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้และความปลอดภัยของข้อมูลทางการเงินของคุณ
เมื่อคุณใช้บริการของเรา หมายความว่าคุณตกลงปฏิบัติตามข้อตกลงและนโยบายนี้ โปรดอ่านอย่างละเอียดก่อนใช้บริการ หากคุณไม่เห็นด้วย กรุณาหยุดใช้บริการทันที

2. การใช้งานแอปพลิเคชัน
- แอปนี้ให้บริการด้านการเงิน เช่น การจัดการบัญชี การโอนเงิน หรือบริการอื่น ๆ
- คุณต้องมีอายุอย่างน้อย 18 ปี หรือมีอายุถึงเกณฑ์ที่กฎหมายกำหนด
- คุณต้องให้ข้อมูลที่ถูกต้อง และต้องรับผิดชอบในการรักษาความปลอดภัยบัญชีของคุณ

3. บัญชีผู้ใช้
- การลงทะเบียน: ต้องลงทะเบียนบัญชีเพื่อเข้าถึงบริการบางส่วน
- ความปลอดภัย: คุณต้องรักษาความลับของรหัสผ่าน หากพบการใช้บัญชีโดยไม่ได้รับอนุญาต ให้แจ้งเราทันที
- การปิดบัญชี: บริษัทสามารถระงับหรือปิดบัญชีของคุณหากพบว่ามีการละเมิดเงื่อนไข

4. ค่าธรรมเนียมและค่าบริการ
- บริการบางอย่างอาจมีค่าธรรมเนียม ซึ่งบริษัทจะแจ้งให้ทราบล่วงหน้า
- บริษัทสามารถเปลี่ยนแปลงค่าธรรมเนียมได้ตามดุลยพินิจ

5. ข้อมูลที่เราเก็บรวบรวม
เราอาจเก็บข้อมูลของคุณ เช่น:
- ชื่อ นามสกุล
- อีเมล และหมายเลขโทรศัพท์
- ข้อมูลบัญชีธนาคารหรือบัตรเครดิต
- ที่อยู่ IP และข้อมูลอุปกรณ์

6. วิธีการใช้ข้อมูลของคุณ
เราใช้ข้อมูลของคุณเพื่อ:
- ให้บริการและปรับปรุงแอป
- ยืนยันตัวตนและป้องกันการฉ้อโกง
- ดำเนินการธุรกรรมและการชำระเงิน
- วิเคราะห์ข้อมูลเพื่อพัฒนาแอป

7. การแบ่งปันข้อมูลของคุณ
เราไม่ขายข้อมูลของคุณ ยกเว้นในกรณีต่อไปนี้:
- พันธมิตรทางธุรกิจ: เพื่อช่วยดำเนินการธุรกรรม
- ข้อกำหนดทางกฎหมาย: หากกฎหมายกำหนดให้เปิดเผยข้อมูล
- การปกป้องสิทธิ์: เพื่อป้องกันการฉ้อโกงหรือรักษาความปลอดภัย

8. การรักษาความปลอดภัยของข้อมูล
เราใช้มาตรการรักษาความปลอดภัย เช่น:
- การเข้ารหัสข้อมูล
- การจำกัดสิทธิ์การเข้าถึง
- ระบบตรวจจับและป้องกันการบุกรุก

9. สิทธิ์ของคุณ
คุณมีสิทธิ์:
- ขอรับสำเนาข้อมูลของคุณ
- แก้ไขหรือขอลบข้อมูล
- คัดค้านการใช้ข้อมูลเพื่อการตลาด

10. คุกกี้และเทคโนโลยีติดตาม
เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งาน คุณสามารถจัดการคุกกี้ได้จากการตั้งค่าอุปกรณ์ของคุณ

11. การเปลี่ยนแปลงข้อกำหนดและนโยบาย
เราสามารถอัปเดตข้อตกลงนี้ได้ทุกเมื่อ และจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงที่สำคัญ

12. กฎหมายที่ใช้บังคับ
ข้อตกลงนี้อยู่ภายใต้กฎหมายของ ประเทศไทย และข้อพิพาทใด ๆ จะต้องดำเนินการภายใต้ศาลที่มีเขตอำนาจ

โปรดอ่านและทำความเข้าใจข้อตกลงนี้ก่อนใช้บริการของเรา
`;

export default function TermsAndConditions() {
  const { setIsAccepted } = useContext(TermsContext);

  return (
    <ThemedSafeAreaView>
      <ThemedView className="h-[1400px] px-5">
        <ThemedText className="h-full">{TERMS_CONTENT}</ThemedText>
      </ThemedView>
      <ThemedView className="h-[200px] !justify-start">
        <ThemedButton
          onPress={() => {
            setIsAccepted(true);
            router.back();
          }}
          className="w-[80%] h-10"
          mode="confirm"
        >
          ยอมรับเงื่อนไขทั้งหมด
        </ThemedButton>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
